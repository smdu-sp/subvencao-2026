import Database from "better-sqlite3";
import wkx from "wkx";
import proj4 from "proj4";
import path from "path";
import * as shapefile from "shapefile";

proj4.defs(
  "EPSG:31983",
  "+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
const toWGS84 = proj4("EPSG:31983", "WGS84");

const MAP_DIR     = path.join(process.cwd(), "public", "map");
const NEW_MAP_DIR = path.join(process.cwd(), "public", "new_map");

type ShpLayer  = { type: "shp";  file: string };
type GpkgLayer = { type: "gpkg"; file: string; table: string };

export const LAYERS: Record<string, ShpLayer | GpkgLayer> = {
  perimetroSubvencaoHisHmp: { type: "shp",  file: path.join(NEW_MAP_DIR, "perimetro_subvencao_his_hmp.shp") },
  perimetroSubvencaoPadrao: { type: "shp",  file: path.join(NEW_MAP_DIR, "perimetro_subvencao_padrao.shp") },
  empreendimentos:          { type: "gpkg", file: path.join(MAP_DIR, "shapes.gpkg"), table: '0shapes_subvencao_site — subvencao_economica' },
};

export type LayerKey = keyof typeof LAYERS;

function reprojectCoord(coord: number[]): number[] {
  return toWGS84.forward([coord[0], coord[1]]);
}

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

function parseGpkgGeom(blob: Buffer): wkx.Geometry {
  const flags = blob[3];
  const envelopeType = (flags >> 1) & 0x07;
  const envelopeSizes = [0, 32, 48, 48, 64];
  const headerSize = 8 + (envelopeSizes[envelopeType] ?? 0);
  return wkx.Geometry.parse(blob.slice(headerSize));
}

function readGpkgLayer(layer: GpkgLayer): GeoJSON.FeatureCollection {
  const db = new Database(layer.file, { readonly: true });
  const rows = db.prepare(`SELECT * FROM "${layer.table}"`).all() as Record<string, unknown>[];
  db.close();

  const features: GeoJSON.Feature[] = rows.map((row) => {
    const wkxGeom = parseGpkgGeom(row.geom as Buffer);
    const reprojected = reprojectGeometry(wkxGeom.toGeoJSON() as GeoJSON.Geometry);
    const { geom: _geom, ...properties } = row;
    return {
      type: "Feature",
      geometry: reprojected,
      properties: properties as GeoJSON.GeoJsonProperties,
    };
  });

  return { type: "FeatureCollection", features };
}

async function readShpLayer(layer: ShpLayer): Promise<GeoJSON.FeatureCollection> {
  const source = await shapefile.open(layer.file);
  const features: GeoJSON.Feature[] = [];

  let result = await source.read();
  while (!result.done) {
    const feature = result.value as GeoJSON.Feature;
    if (feature.geometry) feature.geometry = reprojectGeometry(feature.geometry);
    features.push(feature);
    result = await source.read();
  }

  return { type: "FeatureCollection", features };
}

export async function readLayer(layerKey: LayerKey): Promise<GeoJSON.FeatureCollection> {
  const layer = LAYERS[layerKey];
  if (layer.type === "gpkg") return readGpkgLayer(layer);
  return readShpLayer(layer);
}
