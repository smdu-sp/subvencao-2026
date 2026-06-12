import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import iconv from "iconv-lite";
import path from "path";

const GPKG = path.join(process.cwd(), "public", "map", "shapes.gpkg");
const TABLE = '0shapes_subvencao_site — subvencao_economica';

function decodeText(v: unknown): unknown {
  if (!Buffer.isBuffer(v)) return v;
  return iconv.decode(v, "utf-8");
}

export async function GET() {
  if (process.env.ENVIRONMENT === "production")
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const db = new Database(GPKG, { readonly: true });
  const rows = db.prepare(
    `SELECT fid, cd_identif, cd_chamame, cd_numero_, cd_protoco, cd_process,
            tx_enderec, nm_inscric, nm_interes, cd_categor,
            vl_pontuac, vl_percent, vl_subvenc, tx_site, cd_usuario, dt_atualiz
     FROM "${TABLE}" ORDER BY fid`
  ).all() as Record<string, unknown>[];
  db.close();

  const data = rows.map((row) =>
    Object.fromEntries(Object.entries(row).map(([k, v]) => [k, decodeText(v)]))
  );

  return NextResponse.json(data);
}
