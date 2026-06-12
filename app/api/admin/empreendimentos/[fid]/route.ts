import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

const GPKG = path.join(process.cwd(), "public", "map", "shapes.gpkg");
const TABLE = '0shapes_subvencao_site — subvencao_economica';

const EDITABLE_COLS = [
  "cd_chamame", "cd_numero_", "cd_protoco", "cd_process",
  "tx_enderec", "nm_inscric", "nm_interes", "cd_categor",
  "vl_pontuac", "vl_percent", "vl_subvenc", "tx_site", "cd_usuario", "dt_atualiz",
];

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ fid: string }> }
) {
  if (process.env.ENVIRONMENT === "production")
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const { fid } = await params;
    const fidNum = parseInt(fid, 10);
    if (isNaN(fidNum)) return NextResponse.json({ error: "fid inválido" }, { status: 400 });

    const body = await req.json() as Record<string, unknown>;
    const updates = Object.entries(body).filter(([k]) => EDITABLE_COLS.includes(k));
    if (updates.length === 0) return NextResponse.json({ error: "Nenhum campo válido" }, { status: 400 });

    const setClauses = updates.map(([k]) => `"${k}" = ?`).join(", ");
    const values = [...updates.map(([, v]) => v), fidNum];

    const db = new Database(GPKG);
    // Funções espaciais do GeoPackage não disponíveis no better-sqlite3 — registrar no-ops
    db.function("ST_IsEmpty",      (_geom: unknown) => 0);
    db.function("ST_MinX",         (_geom: unknown) => 0);
    db.function("ST_MaxX",         (_geom: unknown) => 0);
    db.function("ST_MinY",         (_geom: unknown) => 0);
    db.function("ST_MaxY",         (_geom: unknown) => 0);
    db.function("ST_GeometryType", (_geom: unknown) => "POINT");
    db.prepare(`UPDATE "${TABLE}" SET ${setClauses} WHERE fid = ?`).run(values);
    db.close();

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin/empreendimentos PUT]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
