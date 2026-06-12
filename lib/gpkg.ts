import proj4 from "proj4";
import path from "path";
import * as shapefile from "shapefile";

proj4.defs(
  "EPSG:31983",
  "+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
const toWGS84 = proj4("EPSG:31983", "WGS84");

const NEW_MAP_DIR = path.join(process.cwd(), "public", "new_map");

export const LAYERS: Record<string, string> = {
  perimetroExpandido:       path.join(NEW_MAP_DIR, "perimetro_aiu_expandido.shp"),
  requalificaCentro:        path.join(NEW_MAP_DIR, "perimetro_requalifica_centro_original.shp"),
  perimetroSubvencaoHisHmp: path.join(NEW_MAP_DIR, "perimetro_subvencao_his_hmp.shp"),
  perimetroSubvencaoPadrao: path.join(NEW_MAP_DIR, "perimetro_subvencao_padrao.shp"),
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

export async function readLayer(layerKey: LayerKey): Promise<GeoJSON.FeatureCollection> {
  const source = await shapefile.open(LAYERS[layerKey]);
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
