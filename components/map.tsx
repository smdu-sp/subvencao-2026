"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, transformExtent } from "ol/proj";
import { Style, Fill, Stroke } from "ol/style";
import "ol/ol.css";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? "YOUR_MAPTILER_KEY";
const SP_CENTER = fromLonLat([-46.6393, -23.5505]);

const SP_EXTENT = transformExtent([-46.71, -23.595, -46.56, -23.505], "EPSG:4326", "EPSG:3857");
const geojsonFormat = new GeoJSON({ featureProjection: "EPSG:3857" });

export const LEGEND_ITEMS = [
  { label: "HIS-1, HIS-2 e HMP",          type: "polygon" as const,         color: "#c8a832", fill: "rgba(232,208,122,0.55)" },
  { label: "HIS-1, HIS-2, HMP, R2v e nR", type: "polygon" as const,         color: "#5a6fa8", fill: "rgba(170,185,220,0.60)" },
  { label: "Perímetro Requalifica Centro", type: "polygon" as const,         color: "#c0392b", fill: undefined                },
  { label: "Perímetro Expandido AIU-SCE",  type: "polygon-dashed" as const,  color: "#888888", fill: undefined                },
];

function vectorLayer(url: string, style: Style) {
  return new VectorLayer({
    source: new VectorSource({ url, format: geojsonFormat }),
    style,
  });
}

// HIS-1, HIS-2 e HMP — amarelo/bege (camada de baixo)
const styleSubvencaoPadrao = new Style({
  fill:   new Fill({ color: "rgba(232,208,122,0.55)" }),
  stroke: new Stroke({ color: "#c8a832", width: 1.5 }),
});
// HIS-1, HIS-2, HMP, R2v e nR — azul claro (camada de cima)
const styleSubvencaoHisHmp = new Style({
  fill:   new Fill({ color: "rgba(170,185,220,0.60)" }),
  stroke: new Stroke({ color: "#5a6fa8", width: 1.5 }),
});
// Requalifica Centro — contorno vermelho sem fill
const styleRequalificaCentro = new Style({
  stroke: new Stroke({ color: "#c0392b", width: 2 }),
});
// AIU Expandido — contorno cinza tracejado sem fill
const styleAIUExpandido = new Style({
  stroke: new Stroke({ color: "#888888", width: 1.5, lineDash: [6, 4] }),
});

interface MapViewProps {
  onMoveEnd?: (center: [number, number], zoom: number) => void;
}

export function MapView({ onMoveEnd }: MapViewProps) {
  const mapRef      = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.maptiler.com/maps/dataviz-v4/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
            tileSize: 256,
            maxZoom: 20,
            attributions: '© <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }),
        }),
        vectorLayer("/api/map/perimetroSubvencaoPadrao",  styleSubvencaoPadrao),
        vectorLayer("/api/map/perimetroSubvencaoHisHmp",  styleSubvencaoHisHmp),
        vectorLayer("/api/map/requalificaCentro",         styleRequalificaCentro),
        vectorLayer("/api/map/perimetroExpandido",         styleAIUExpandido),
      ],
      view: new View({ center: SP_CENTER, zoom: 13.5, minZoom: 12.5, maxZoom: 17, extent: SP_EXTENT }),
      controls: [],
    });

    if (onMoveEnd) {
      mapInstance.current.on("moveend", () => {
        const view = mapInstance.current!.getView();
        const [lon, lat] = view.getCenter()!;
        onMoveEnd([lon, lat], view.getZoom() ?? 0);
      });
    }

    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, [onMoveEnd]);

  return <div ref={mapRef} className="w-full h-full" />;
}
