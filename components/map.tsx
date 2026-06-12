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
import { Style, Fill, Stroke, Circle } from "ol/style";
import type { FeatureLike } from "ol/Feature";
import "ol/ol.css";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? "YOUR_MAPTILER_KEY";
const SP_CENTER = fromLonLat([-46.6392, -23.549]);

const SP_EXTENT = transformExtent([-46.74, -23.598, -46.56, -23.505], "EPSG:4326", "EPSG:3857");
const geojsonFormat = new GeoJSON({ featureProjection: "EPSG:3857" });

export const CHAMAMENTO_COLORS: Record<string, string> = {
  "01/2023/SMUL": "#517bec",
  "02/2024/SMUL": "#f38943",
  "01/2025/SMUL": "#cc3971",
};

export const LEGEND_ITEMS = [
  { label: "HIS-1, HIS-2, HMP, R2v e nR", type: "polygon" as const, color: "#c8a832", fill: "rgba(232,208,122,0.55)" },
  { label: "HIS-1, HIS-2 e HMP",          type: "polygon" as const, color: "#5a6fa8", fill: "rgba(170,185,220,0.60)" },
  { label: "1º Chamamento Público",        type: "point" as const,   color: CHAMAMENTO_COLORS["01/2023/SMUL"], fill: undefined },
  { label: "2º Chamamento Público",        type: "point" as const,   color: CHAMAMENTO_COLORS["02/2024/SMUL"], fill: undefined },
  { label: "3º Chamamento Público",        type: "point" as const,   color: CHAMAMENTO_COLORS["01/2025/SMUL"], fill: undefined },
];

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function vectorLayer(url: string, style: Style) {
  return new VectorLayer({
    source: new VectorSource({ url, format: geojsonFormat }),
    style,
  });
}

function dynamicLayer(url: string, styleFn: (f: FeatureLike) => Style, radiusRef: React.RefObject<number>) {
  return new VectorLayer({
    source: new VectorSource({ url, format: geojsonFormat }),
    style: (f) => { void radiusRef; return styleFn(f); },
  });
}

const styleSubvencaoPadrao = new Style({
  fill:   new Fill({ color: "rgba(232,208,122,0.55)" }),
  stroke: new Stroke({ color: "#c8a832", width: 1.5 }),
});
const styleSubvencaoHisHmp = new Style({
  fill:   new Fill({ color: "rgba(170,185,220,0.60)" }),
  stroke: new Stroke({ color: "#5a6fa8", width: 1.5 }),
});

function makeStyleEmpreendimento(radiusRef: React.RefObject<number>) {
  return (feature: FeatureLike): Style => {
    const color = CHAMAMENTO_COLORS[feature.get("cd_chamame") as string] ?? "#888";
    return new Style({
      image: new Circle({ radius: radiusRef.current ?? 4, fill: new Fill({ color }) }),
    });
  };
}

interface MapViewProps {
  onMoveEnd?: (center: [number, number], zoom: number) => void;
  pointRadius?: number;
}

export function MapView({ onMoveEnd, pointRadius = 4 }: MapViewProps) {
  const mapRef                  = useRef<HTMLDivElement>(null);
  const tooltipRef              = useRef<HTMLDivElement>(null);
  const mapInstance             = useRef<Map | null>(null);
  const empreendimentosLayerRef = useRef<VectorLayer | null>(null);
  const pointRadiusRef          = useRef(pointRadius);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const empreendimentosLayer = new VectorLayer({
      source: new VectorSource({ url: "/api/map/empreendimentos", format: geojsonFormat }),
      style: makeStyleEmpreendimento(pointRadiusRef),
    });
    empreendimentosLayerRef.current = empreendimentosLayer;

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
        vectorLayer("/api/map/perimetroSubvencaoPadrao", styleSubvencaoPadrao),
        vectorLayer("/api/map/perimetroSubvencaoHisHmp", styleSubvencaoHisHmp),
        empreendimentosLayer,
      ],
      view: new View({ center: SP_CENTER, zoom: 13.2, minZoom: 12.5, maxZoom: 17, extent: SP_EXTENT }),
      controls: [],
    });

    if (onMoveEnd) {
      mapInstance.current.on("moveend", () => {
        const view = mapInstance.current!.getView();
        const [lon, lat] = view.getCenter()!;
        onMoveEnd([lon, lat], view.getZoom() ?? 0);
      });
    }

    mapInstance.current.on("pointermove", (e) => {
      const map     = mapInstance.current!;
      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      let found = false;
      map.forEachFeatureAtPixel(e.pixel, (feature) => {
        if (found) return;
        const chamamento = feature.get("cd_chamame");
        if (!chamamento) return;

        const endereco    = feature.get("tx_enderec") as string ?? "";
        const interessado = feature.get("nm_interes") as string ?? "";
        const categoria   = feature.get("cd_categor") as string ?? "";
        const valor       = feature.get("vl_subvenc") as number ?? 0;
        const color       = CHAMAMENTO_COLORS[chamamento as string] ?? "#888";

        tooltip.innerHTML = `
          <div class="font-semibold text-[11px] mb-1" style="color:${color}">${chamamento}</div>
          <div class="font-medium text-xs leading-tight">${endereco}</div>
          <div class="text-[11px] text-gray-500 mt-0.5 leading-tight">${interessado}</div>
          <div class="flex items-center justify-between gap-3 mt-1.5 pt-1.5 border-t border-gray-100">
            <span class="text-[10px] text-gray-400 uppercase tracking-wide">${categoria}</span>
            <span class="text-[11px] font-semibold text-gray-700">${BRL.format(valor)}</span>
          </div>
        `;

        const container = map.getTargetElement() as HTMLElement;
        const { width: cw, height: ch } = container.getBoundingClientRect();
        const [px, py] = e.pixel;
        const tw = 220, th = 90;
        const left = px + 14 + tw > cw ? px - tw - 8 : px + 14;
        const top  = py - 10 + th > ch ? py - th - 4 : py - 10;

        tooltip.style.left    = `${left}px`;
        tooltip.style.top     = `${top}px`;
        tooltip.style.display = "block";
        map.getTargetElement().style.cursor = "pointer";
        found = true;
      }, { hitTolerance: 6 });

      if (!found) {
        tooltip.style.display = "none";
        map.getTargetElement().style.cursor = "";
      }
    });

    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, [onMoveEnd]);

  useEffect(() => {
    pointRadiusRef.current = pointRadius;
    empreendimentosLayerRef.current?.changed();
  }, [pointRadius]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute z-30 pointer-events-none bg-white rounded shadow-lg border border-gray-100 px-3 py-2 w-55 text-gray-800"
        style={{ display: "none" }}
      />
    </div>
  );
}
