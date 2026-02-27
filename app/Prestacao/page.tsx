"use client";

import { useState } from "react";
import Link from "next/link";
import GoBack from "../components/GoBack";
import { RiArrowDownSFill, RiFolderLine } from "react-icons/ri";

const termos = [
  "01/2023/SMUL - Taquari Agro Comercial LTDA",
  "02/2023/SMUL - Duque de Caxias 408 LTDA",
  "03/2023/SMUL - SM01 - Edifício Virgínia SPE S/A",
  "02/2024/SMUL - MI88 EMPREENDIMENTOS E PARTICIPACOES LTDA",
  "03/2024/SMUL - CENTRAL CAPITAL SPE II LTDA",
  "04/2024/SMUL - CONDOMÍNIO EDIFÍCIO COMENDADOR ARTIN KALAIGIAN",
  "05/2024/SMUL - LAF SETE DE ABRIL SPE LTDA",
  "06/2024/SMUL - ORGANIZACAO TOLEDO LARA LTDA",
  "01/2025/SMUL - Elza Lara Loeb",
];

const Prestacao = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Selecione o Termo de Outorga");
  const [tipoPrestacao, setTipoPrestacao] = useState<"anual" | "marco" | "">("");
  const [arquivo, setArquivo] = useState<File | null>(null);

  return (
    <main className="flex justify-center">
      <div className="flex w-full max-w-215 flex-col items-start gap-8 rounded-lg p-8">
        <GoBack />
        <div>
          <p className="text-lg">Nesta página o subvencionado enviará os documentos e arquivos relacionados à prestação de contas da iniciativa.</p>
        </div>
        <div className="flex flex-col gap-0">
          <strong>Entenda as regras</strong>
          <Link
            target="_blank"
            href="https://legislacao.prefeitura.sp.gov.br/leis/instrucao-normativa-secretaria-municipal-de-urbanismo-e-licenciamento-smul-1-de-16-de-outubro-de-2024/consolidado"
            className="text-(--button-background) underline"
          >
            Instrução Normativa SMUL n° 01/2024/SMUL
          </Link>
        </div>
        <div className="flex flex-col gap-0">
          <strong>Faça o download dos arquivos</strong>
          <Link
            target="_blank"
            href="https://subvencao.prefeitura.sp.gov.br/wp-content/uploads/2025/02/Anexo_I___Modelo_de_Declaracao_de_Prestacao_de_Contas.docx"
            className="text-(--button-background) underline"
          >
            Anexo I (Instrução Normativa SMUL n° 01/2024/SMUL)
          </Link>
          <Link
            target="_blank"
            href="https://subvencao.prefeitura.sp.gov.br/wp-content/uploads/2025/02/Anexo_II___Modelo_de_Relatorio_Consolidado_da_Documentacao_Comprobatoria.docx"
            className="text-(--button-background) underline"
          >
            Anexo II (Instrução Normativa SMUL n° 01/2024/SMUL)
          </Link>
        </div>
        <div className="w-[37vw]">
          <div className="relative">
            <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between rounded-sm border border-gray-300 bg-white p-2 pr-3 text-left">
              <span>{selected}</span>
              <RiArrowDownSFill className={`text-2xl text-black transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-sm border border-gray-300 bg-white shadow transition-all duration-300 ease-out ${
                open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="max-h-80 overflow-y-auto">
                {termos.map((termo) => (
                  <li key={termo}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(termo);
                        setOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100"
                    >
                      {termo}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-2 flex w-full flex-col gap-10">
          <div className="flex flex-col gap-4">
            <strong className="text-lg">Selecione o tipo de prestação de contas</strong>

            <div className="flex items-center gap-10">
              <label className="flex cursor-pointer items-center gap-3 text-lg">
                <input type="radio" name="tipoPrestacao" value="anual" checked={tipoPrestacao === "anual"} onChange={() => setTipoPrestacao("anual")} className="h-5 w-5 accent-black" />
                Anual
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-lg">
                <input type="radio" name="tipoPrestacao" value="marco" checked={tipoPrestacao === "marco"} onChange={() => setTipoPrestacao("marco")} className="h-5 w-5 accent-black" />
                Marco
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <strong className="text-lg">Faça o upload dos seus documentos</strong>

            <input id="uploadDocs" type="file" className="hidden" onChange={(e) => setArquivo(e.target.files?.[0] ?? null)} />

            <div className="flex items-center gap-4">
              <label htmlFor="uploadDocs" className="flex w-fit cursor-pointer items-center gap-3 rounded-sm bg-[#E9E9EC] px-4 py-3 text-[#173EA5] shadow">
                <RiFolderLine className="text-3xl" />
                <span className="text-lg font-semibold">Pesquisar arquivos</span>
              </label>

              {arquivo && <p className="text-sm text-gray-700">{arquivo.name}</p>}
            </div>
          </div>

          <button type="button" className="w-[180px] rounded-sm bg-[#8DA3D8] py-2 text-2xl font-bold text-white">
            Enviar
          </button>

          <div className="mt-10 w-full rounded-sm bg-[#E6E6E8] px-2 py-4 text-base leading-relaxed text-black">
            <p className="text-sm">
              Denúncias de irregularidades devem ser encaminhadas para o e-mail{" "}
              <a href="mailto:subvencao@prefeitura.sp.gov.br" className="underline">
                subvencao@prefeitura.sp.gov.br
              </a>
            </p>
            <p className="text-sm">
              Material de apoio | Logos Oficiais SMUL e Prefeitura de São Paulo:{" "}
              <Link href="mailto:subvencao@prefeitura.sp.gov.br" target="_blank" className="underline">
                Logos | Identidade 2023 | Oficiais - Google Drive
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Prestacao;
