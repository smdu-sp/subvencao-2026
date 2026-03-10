import { LEGEND_ITEMS } from "./map";

export function MapLegend() {
  return (
    <div className="max-md:w-full md:absolute md:bottom-px md:right-px z-20 bg-white backdrop-blur-sm md:rounded shadow-md px-3 py-3.5 space-y-3.5 pointer-events-none">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <LegendIcon type={item.type} color={item.color} />
          <span className="leading-none">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function LegendIcon({
  type,
  color,
}: {
  type: (typeof LEGEND_ITEMS)[number]["type"];
  color: string;
}) {
  if (type === "point") {
    return (
      <span
        className="inline-block w-3.5 h-3.5 mx-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
    );
  }

  if (type === "polygon-dashed") {
    return (
      <svg width="28" height="14" className="shrink-0">
        <rect
          x="1" y="2" width="24" height="8"
          fill="transparent"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          rx="1"
        />
      </svg>
    );
  }

  // polygon (solid)
  return (
    <svg width="28" height="14" className="shrink-0">
      <rect
        x="1" y="2" width="24" height="8"
        fill="transparent"
        stroke={color}
        strokeWidth="1.5"
        rx="1"
      />
    </svg>
  );
}
