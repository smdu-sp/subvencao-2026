"use client";

import { useEffect, useState } from "react";

type Row = {
  fid: number;
  cd_identif: number;
  cd_chamame: string;
  cd_numero_: string;
  cd_protoco: string;
  cd_process: string;
  tx_enderec: string;
  nm_inscric: string;
  nm_interes: string;
  cd_categor: string;
  vl_pontuac: number;
  vl_percent: string;
  vl_subvenc: number;
  tx_site: string;
  cd_usuario: string | null;
  dt_atualiz: string;
};

const FIELDS: { key: keyof Row; label: string; type?: string }[] = [
  { key: "cd_chamame",  label: "Chamamento" },
  { key: "cd_numero_",  label: "Nº" },
  { key: "tx_enderec",  label: "Endereço" },
  { key: "nm_interes",  label: "Interessado" },
  { key: "nm_inscric",  label: "Inscrição" },
  { key: "cd_categor",  label: "Categoria" },
  { key: "cd_protoco",  label: "Protocolo" },
  { key: "cd_process",  label: "Processo" },
  { key: "vl_pontuac",  label: "Pontuação",  type: "number" },
  { key: "vl_percent",  label: "Percentual" },
  { key: "vl_subvenc",  label: "Subvenção",  type: "number" },
  { key: "tx_site",     label: "Site" },
  { key: "dt_atualiz",  label: "Atualização" },
];

export default function EmpreendimentosAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/empreendimentos")
      .then((r) => r.json())
      .then(setRows);
  }, []);

  function openEdit(row: Row) {
    setEditing({ ...row });
    setMessage(null);
  }

  function onChange(key: keyof Row, value: string) {
    setEditing((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/empreendimentos/${editing.fid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setRows((prev) => prev.map((r) => (r.fid === editing.fid ? editing : r)));
        setMessage({ text: "Salvo com sucesso.", ok: true });
        setEditing(null);
      } else {
        setMessage({ text: "Erro ao salvar.", ok: false });
      }
    } catch {
      setMessage({ text: "Erro de rede.", ok: false });
    } finally {
      setSaving(false);
    }
  }

  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Empreendimentos — edição</h1>

      {message && (
        <div className={`mb-4 px-4 py-2 rounded text-sm ${message.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-100 text-gray-600 uppercase text-[11px]">
            <tr>
              <th className="px-3 py-2 text-left">fid</th>
              <th className="px-3 py-2 text-left">Chamamento</th>
              <th className="px-3 py-2 text-left">Endereço</th>
              <th className="px-3 py-2 text-left">Interessado</th>
              <th className="px-3 py-2 text-left">Categoria</th>
              <th className="px-3 py-2 text-right">Subvenção</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.fid} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{row.fid}</td>
                <td className="px-3 py-2">{row.cd_chamame}</td>
                <td className="px-3 py-2 max-w-60 truncate" title={row.tx_enderec}>{row.tx_enderec}</td>
                <td className="px-3 py-2 max-w-48 truncate" title={row.nm_interes}>{row.nm_interes}</td>
                <td className="px-3 py-2">{row.cd_categor}</td>
                <td className="px-3 py-2 text-right tabular-nums">{BRL.format(row.vl_subvenc)}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => openEdit(row)}
                    className="px-2 py-1 text-[11px] rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edição */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-base font-semibold mb-4 text-gray-800">Editar — fid {editing.fid}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FIELDS.map(({ key, label, type }) => (
                <div key={key} className={key === "tx_enderec" || key === "nm_interes" ? "sm:col-span-2" : ""}>
                  <label className="block text-[11px] text-gray-500 mb-0.5">{label}</label>
                  <input
                    type={type ?? "text"}
                    value={String(editing[key] ?? "")}
                    onChange={(e) => onChange(key, e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-4 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Salvando…" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
