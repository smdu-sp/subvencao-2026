import Database from "better-sqlite3";
import wkx from "wkx";
import proj4 from "proj4";
import iconv from "iconv-lite";
import path from "path";

// EPSG:31983 → WGS84
proj4.defs(
  "EPSG:31983",
  "+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
const toWGS84 = proj4("EPSG:31983", "WGS84");

const GPKG_PATH = path.join(process.cwd(), "public", "map", "shapes.gpkg");

export const LAYERS = {
  perimetroConsolidado: 'shapes_subvencao_site — perimetro_aiu_consolidado_',
  perimetroExpandido: 'shapes_subvencao_site — perimetro_aiu_expandido',
  requalificaCentro: 'shapes_subvencao_site — requalifica_centro_perimetro_geral',
  empreendimentos: 'shapes_subvencao_site — subvencao_economica',
} as const;

export type LayerKey = keyof typeof LAYERS;

/** Lê o WKB a partir do blob GeoPackage (pula o header GP) */
function parseGpkgGeom(blob: Buffer): wkx.Geometry {
  // GeoPackage header: magic(2) + version(1) + flags(1) + srs_id(4) + optional envelope
  const flags = blob[3];
  const envelopeType = (flags >> 1) & 0x07;
  const envelopeSizes = [0, 32, 48, 48, 64];
  const headerSize = 8 + (envelopeSizes[envelopeType] ?? 0);
  const wkbBuffer = blob.slice(headerSize);
  return wkx.Geometry.parse(wkbBuffer);
}

/** Reprojecta coordenada [x, y] de EPSG:31983 para WGS84 [lon, lat] */
function reprojectCoord(coord: number[]): number[] {
  return toWGS84.forward([coord[0], coord[1]]);
}

/** Reprojeta recursivamente todos os pontos de um GeoJSON geometry */
function reprojectGeometry(geom: GeoJSON.Geometry): GeoJSON.Geometry {
  if (geom.type === "Point") {
    return { ...geom, coordinates: reprojectCoord(geom.coordinates as number[]) };
  }
  if (geom.type === "MultiPoint" || geom.type === "LineString") {
    return { ...geom, coordinates: (geom.coordinates as number[][]).map(reprojectCoord) };
  }
  if (geom.type === "MultiLineString" || geom.type === "Polygon") {
    return {
      ...geom,
      coordinates: (geom.coordinates as number[][][]).map((ring) => ring.map(reprojectCoord)),
    };
  }
  if (geom.type === "MultiPolygon") {
    return {
      ...geom,
      coordinates: (geom.coordinates as number[][][][]).map((poly) =>
        poly.map((ring) => ring.map(reprojectCoord))
      ),
    };
  }
  return geom;
}

function fixEncoding(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const buf = Buffer.from(value, "latin1");
  return iconv.decode(buf, "UTF-8");
}

function fixRowEncoding(row: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k, fixEncoding(v)])
  );
}

export function readLayer(layerKey: LayerKey): GeoJSON.FeatureCollection {
  const tableName = LAYERS[layerKey];
  const db = new Database(GPKG_PATH, { readonly: true });

  const rows = db.prepare(`SELECT * FROM "${tableName}"`).all() as Record<string, unknown>[];
  db.close();

  const features: GeoJSON.Feature[] = rows.map((row) => {
    const geomBlob = row.geom as Buffer;
    const wkxGeom = parseGpkgGeom(geomBlob);
    const geojsonGeom = wkxGeom.toGeoJSON() as GeoJSON.Geometry;
    const reprojected = reprojectGeometry(geojsonGeom);

    const { geom: _geom, ...rawProperties } = row;
    const properties = fixRowEncoding(rawProperties);
    return {
      type: "Feature",
      geometry: reprojected,
      properties: properties as GeoJSON.GeoJsonProperties,
    };
  });

  return { type: "FeatureCollection", features };
}
