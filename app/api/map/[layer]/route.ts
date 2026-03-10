import { NextResponse } from "next/server";
import { readLayer, type LayerKey, LAYERS } from "@/lib/gpkg";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ layer: string }> }
) {
  const { layer } = await params;

  if (!(layer in LAYERS)) {
    return NextResponse.json({ error: "Layer not found" }, { status: 404 });
  }

  const geojson = readLayer(layer as LayerKey);
  return NextResponse.json(geojson);
}
