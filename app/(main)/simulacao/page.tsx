"use client";

import { useState, useMemo } from "react";
import { DM_Sans, Open_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

// ─── Tipos e constantes ────────────────────────────────────────────────────────

type UsoKey = "his1" | "his2" | "hmp" | "r2v" | "nao_residencial";
type PatrimonioOpcao = "tombado" | "envoltoria" | "nao_tombado" | "";
type BonusC = "none" | "his1_30" | "his2_40" | "hmp_50";

const USO_OPCOES: { id: UsoKey; label: string; pontos: number }[] = [
  { id: "his1", label: "Habitação de Interesse Social – HIS-1", pontos: 35 },
  { id: "his2", label: "Habitação de Interesse Social – HIS-2", pontos: 30 },
  { id: "hmp", label: "Habitação de Mercado Popular – HMP", pontos: 20 },
  { id: "r2v", label: "Residencial na subcategoria R2v", pontos: 15 },
  { id: "nao_residencial", label: "Não Residencial", pontos: 10 },
];

const INTEGRACAO_OPCOES = [
  { id: "fachada_ativa", label: "Fachada Ativa", pontos: 25 },
  { id: "fruicao_publica", label: "Fruição Pública", pontos: 15 },
  {
    id: "mar",
    label: "Disponibilização de área para o Museu de Arte de Rua (MAR)",
    pontos: 5,
  },
  {
    id: "prox_obras",
    label:
      "Proximidade de obras de construção, reforma ou requalificação sem apoio da Subvenção Econômica",
    pontos: 5,
  },
];

type ProxCredSub = "" | "um" | "dois_mais";

const TECNOLOGIA_OPCOES = [
  { id: "quota_ambiental", label: "Quota Ambiental", pontos: 10 },
  { id: "calcada", label: "Calçada com Permeabilidade", pontos: 5 },
  { id: "agua", label: "Uso racional e reuso da água", pontos: 5 },
  {
    id: "certificacao",
    label: "Incentivo à certificação de edificação sustentável",
    pontos: 5,
  },
];

// ─── Formatadores ─────────────────────────────────────────────────────────────

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const NUM = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// ─── Sub-componentes visuais ──────────────────────────────────────────────────

function CabecalhoSecao({
  numero,
  titulo,
}: {
  numero: string;
  titulo: string;
}) {
  return (
    <div className="flex items-stretch mb-5">
      <div className="w-1.5 shrink-0 bg-[#0a3297] rounded-l-sm" />
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-r-sm flex-1">
        <span
          className={`${dmSans.className} text-xs font-bold uppercase tracking-widest text-[#0a3297]`}
        >
          {numero}
        </span>
        <span
          className={`${dmSans.className} text-[19px] font-bold text-black`}
        >
          {titulo}
        </span>
      </div>
    </div>
  );
}

function TituloSubsecao({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={`${dmSans.className} text-[17px] font-bold text-[#0a3297] mt-7 mb-2`}
    >
      {children}
    </h3>
  );
}

function TagPontuacao({ valor, maximo }: { valor: number; maximo?: number }) {
  return (
    <span className="inline-flex items-center gap-1 bg-gray-100 rounded-sm px-2.5 py-1 mt-3 text-[13px]">
      <span className="text-gray-500">Subtotal:</span>
      <span className={`font-bold text-[#0a3297]`}>
        {NUM.format(valor)} pts
      </span>
      {maximo !== undefined && (
        <span className="text-gray-400">/ {maximo}</span>
      )}
    </span>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function Simulacao() {
  // Quadro 1 – Uso do Imóvel
  const [uso, setUso] = useState<Record<UsoKey, string>>({
    his1: "",
    his2: "",
    hmp: "",
    r2v: "",
    nao_residencial: "",
  });

  // Quadro 1 – Patrimônio Histórico
  const [patrimonio, setPatrimonio] = useState<PatrimonioOpcao>("");

  // Quadro 2 – Integração Urbana
  const [integracaoMarcados, setIntegracaoMarcados] = useState<string[]>([]);
  const [proxCredAberto, setProxCredAberto] = useState(false);
  const [proxCredSub, setProxCredSub] = useState<ProxCredSub>("");

  // Quadro 2 – Tecnologia Sustentável
  const [tecnologiaMarcados, setTecnologiaMarcados] = useState<string[]>([]);

  // Bonificação
  const [bonusA, setBonusA] = useState(false);
  const [bonusB, setBonusB] = useState(false);
  const [bonusC, setBonusC] = useState<BonusC>("none");

  // Valores financeiros
  const [vp, setVp] = useState("");
  const [vn, setVn] = useState("");

  // Detalhamento expandido
  const [detalheAberto, setDetalheAberto] = useState(false);

  // Helper: alterna checkbox em lista
  function alternarLista(
    id: string,
    lista: string[],
    setLista: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    setLista(
      lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id],
    );
  }

  // ─── Cálculos ──────────────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const somaUso = USO_OPCOES.reduce(
      (s, o) => s + (parseFloat(uso[o.id]) || 0),
      0,
    );

    // P1 – Uso do Imóvel (max 30)
    const p1Raw = USO_OPCOES.reduce(
      (s, o) => s + ((parseFloat(uso[o.id]) || 0) / 100) * o.pontos,
      0,
    );
    const p1 = Math.min(p1Raw, 30);

    // P2 – Patrimônio (max 20)
    const p2 =
      patrimonio === "tombado" ? 20 : patrimonio === "envoltoria" ? 5 : 0;

    // P3 – Integração
    const pontoProxCred =
      proxCredSub === "um" ? 5 : proxCredSub === "dois_mais" ? 10 : 0;
    const p3 =
      INTEGRACAO_OPCOES.reduce(
        (s, o) => (integracaoMarcados.includes(o.id) ? s + o.pontos : s),
        0,
      ) + pontoProxCred;

    // P4 – Tecnologia
    const p4 = TECNOLOGIA_OPCOES.reduce(
      (s, o) => (tecnologiaMarcados.includes(o.id) ? s + o.pontos : s),
      0,
    );

    // P total (max 100)
    const P = Math.min(p1 + p2 + p3 + p4, 100);

    // S base = P × 0,25
    const sBase = P * 0.25;

    // Bonificação (cada item +5%, respeitando max 25)
    const numBonus = [bonusA, bonusB, bonusC !== "none"].filter(Boolean).length;
    const S = Math.min(sBase + numBonus * 5, 25);

    // Valores financeiros
    const vpNum = parseFloat(vp.replace(",", ".")) || 0;
    const vnNum = parseFloat(vn.replace(",", ".")) || 0;
    const Vs = (vpNum - vnNum) * (S / 100);

    return {
      somaUso,
      p1,
      p1Raw,
      p2,
      p3,
      p4,
      P,
      sBase,
      numBonus,
      S,
      vpNum,
      vnNum,
      Vs,
    };
  }, [
    uso,
    patrimonio,
    integracaoMarcados,
    proxCredSub,
    tecnologiaMarcados,
    bonusA,
    bonusB,
    bonusC,
    vp,
    vn,
  ]);

  const temFinanceiro = calc.vpNum > 0;
  const vpMenorQueVn = temFinanceiro && calc.vpNum < calc.vnNum;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <main id="main-content">
      <section
        aria-labelledby="titulo-simulacao"
        className={`${openSans.className} text-black max-w-4xl mx-auto px-4 mt-5 pt-11 pb-20 bg-white`}
      >
        {/* Cabeçalho da página */}
        <header className="mb-10">
          <h1
            id="titulo-simulacao"
            className={`${dmSans.className} text-[#0a3297] text-[26px] font-bold`}
          >
            Simulação de Subvenção Econômica
          </h1>
          <p className="text-[18px] mt-2 text-gray-700 leading-snug">
            Preencha os campos abaixo para estimar a pontuação e o valor de
            subvenção do seu projeto, conforme o{" "}
            <strong>Decreto Municipal nº 62.878/2023</strong>.
          </p>
          <p className="text-[13px] mt-2 text-gray-400">
            * Esta simulação é apenas informativa. Os valores finais dependem de
            análise técnica da SMUL.
          </p>
        </header>

        {/* ══════════════════════════════════════════════════════════════
            QUADRO 1 – Critérios de Relevante Interesse Urbanístico
        ══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="quadro1-titulo" className="mb-10">
          <h2 id="quadro1-titulo" className="sr-only">
            Quadro 1 – Critérios de Relevante Interesse Urbanístico
          </h2>
          <CabecalhoSecao
            numero="Quadro 1"
            titulo="Critérios de Relevante Interesse Urbanístico"
          />

          {/* Uso do Imóvel */}
          <fieldset>
            <legend>
              <TituloSubsecao>Uso do Imóvel</TituloSubsecao>
            </legend>
            <p className="text-[15px] text-gray-600 mb-4">
              Informe a porcentagem de área destinada a cada uso. A soma deve
              ser igual a <strong>100%</strong>. A pontuação é calculada
              proporcionalmente (máximo de <strong>30 pontos</strong>).
            </p>

            <div className="flex flex-col gap-3">
              {USO_OPCOES.map((opt) => (
                <div key={opt.id} className="flex items-center gap-4 flex-wrap">
                  <label
                    htmlFor={`uso-${opt.id}`}
                    className="text-[16px] flex-1 min-w-52 leading-snug"
                  >
                    {opt.label}
                    <span className="ml-1.5 text-[12px] text-gray-400">
                      ({opt.pontos} pts)
                    </span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={`uso-${opt.id}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={uso[opt.id]}
                      onChange={(e) =>
                        setUso((prev) => ({
                          ...prev,
                          [opt.id]: e.target.value,
                        }))
                      }
                      className="w-24 border border-gray-300 rounded-sm px-2.5 py-1.5 text-right text-[16px] focus:outline-none focus:border-[#0a3297] focus:ring-1 focus:ring-[#0a3297]"
                      placeholder="0"
                    />
                    <span className="text-[16px] text-gray-600 w-4">%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicador da soma */}
            <div
              className={`mt-4 inline-flex items-center gap-2 text-[14px] font-semibold px-3 py-1.5 rounded-sm ${
                calc.somaUso === 100
                  ? "bg-green-50 text-green-700"
                  : calc.somaUso > 100
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-500"
              }`}
              aria-live="polite"
            >
              <span>Soma: {NUM.format(calc.somaUso)}%</span>
              {calc.somaUso === 100 && <span aria-hidden="true">✓</span>}
              {calc.somaUso > 100 && <span>— ultrapassa 100%</span>}
              {calc.somaUso > 0 && calc.somaUso < 100 && (
                <span>— faltam {NUM.format(100 - calc.somaUso)}%</span>
              )}
            </div>

            <div className="block mt-1">
              <TagPontuacao valor={calc.p1} maximo={30} />
            </div>
          </fieldset>

          {/* Valorização do Patrimônio Histórico */}
          <fieldset className="mt-2">
            <legend>
              <TituloSubsecao>
                Valorização do Patrimônio Histórico
              </TituloSubsecao>
            </legend>
            <p className="text-[15px] text-gray-600 mb-4">
              Selecione a condição patrimonial do imóvel (máximo de{" "}
              <strong>20 pontos</strong>). As opções não são cumulativas entre
              si.
            </p>

            <div className="flex flex-col gap-3">
              {[
                {
                  valor: "tombado" as PatrimonioOpcao,
                  label: "Imóvel Tombado (IPHAN, CONDEPHAAT ou CONPRESP)",
                  pontos: 20,
                },
                {
                  valor: "envoltoria" as PatrimonioOpcao,
                  label: "Imóvel em área envoltória de bem tombado",
                  pontos: 5,
                },
                {
                  valor: "nao_tombado" as PatrimonioOpcao,
                  label:
                    "Imóvel não tombado e não localizado em área envoltória",
                  pontos: 0,
                },
              ].map((opt) => (
                <label
                  key={opt.valor}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="patrimonio"
                    value={opt.valor}
                    checked={patrimonio === opt.valor}
                    onChange={() => setPatrimonio(opt.valor)}
                    className="mt-0.5 h-5 w-5 accent-[#0a3297] shrink-0"
                  />
                  <span className="text-[16px] leading-snug">
                    {opt.label}
                    <span className="ml-1.5 text-[12px] text-gray-400">
                      ({opt.pontos} pts)
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <TagPontuacao valor={calc.p2} maximo={20} />
          </fieldset>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            QUADRO 2 – Elementos Geradores de Externalidades Positivas
        ══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="quadro2-titulo" className="mb-10">
          <h2 id="quadro2-titulo" className="sr-only">
            Quadro 2 – Elementos Geradores de Externalidades Positivas
          </h2>
          <CabecalhoSecao
            numero="Quadro 2"
            titulo="Elementos Geradores de Externalidades Positivas"
          />

          {/* Integração com a Dinâmica Urbana */}
          <fieldset>
            <legend>
              <TituloSubsecao>
                Integração do Projeto com a Dinâmica Urbana
              </TituloSubsecao>
            </legend>
            <p className="text-[15px] text-gray-600 mb-4">
              Selecione todos os elementos aplicáveis. Os itens são{" "}
              <strong>cumulativos</strong> entre si.
            </p>

            <div className="flex flex-col gap-3">
              {INTEGRACAO_OPCOES.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={integracaoMarcados.includes(opt.id)}
                    onChange={() =>
                      alternarLista(
                        opt.id,
                        integracaoMarcados,
                        setIntegracaoMarcados,
                      )
                    }
                    className="mt-0.5 h-5 w-5 accent-[#0a3297] shrink-0"
                    aria-label={opt.label}
                  />
                  <span className="text-[16px] leading-snug">
                    {opt.label}
                    <span className="ml-1.5 text-[12px] text-gray-400">
                      ({opt.pontos} pts)
                    </span>
                  </span>
                </label>
              ))}

              {/* Item especial: Proximidade de projetos credenciados */}
              <div className="flex flex-col gap-0">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={proxCredSub !== ""}
                    aria-expanded={proxCredAberto}
                    aria-controls="prox-cred-subopcoes"
                    onChange={() => {
                      if (proxCredAberto) {
                        // fechar e limpar
                        setProxCredAberto(false);
                        setProxCredSub("");
                      } else {
                        setProxCredAberto(true);
                      }
                    }}
                    className="mt-0.5 h-5 w-5 accent-[#0a3297] shrink-0"
                  />
                  <span className="text-[16px] leading-snug">
                    Proximidade de projetos credenciados ou outorgados para
                    Subvenção Econômica
                    <span className="ml-1.5 text-[12px] text-gray-400">
                      (5 ou 10 pts)
                    </span>
                  </span>
                </label>

                {/* Sub-opções (expandidas quando aberto) */}
                <div
                  id="prox-cred-subopcoes"
                  className={`grid transition-all duration-300 ease-out ${
                    proxCredAberto
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <fieldset className="ml-8 mt-2 mb-1 flex flex-col gap-2 border-l-2 border-[#0a3297]/20 pl-4">
                      <legend className="sr-only">
                        Quantidade de projetos próximos credenciados
                      </legend>

                      {proxCredAberto && proxCredSub === "" && (
                        <p className="text-[13px] text-amber-600 font-medium mb-1" role="alert">
                          Selecione uma das opções abaixo para pontuar.
                        </p>
                      )}

                      {[
                        { valor: "um" as ProxCredSub, label: "1 projeto", pontos: 5 },
                        { valor: "dois_mais" as ProxCredSub, label: "2 ou mais projetos", pontos: 10 },
                      ].map((sub) => (
                        <label
                          key={sub.valor}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="prox_credenciados_sub"
                            value={sub.valor}
                            checked={proxCredSub === sub.valor}
                            onChange={() => setProxCredSub(sub.valor)}
                            className="h-4 w-4 accent-[#0a3297] shrink-0"
                          />
                          <span className="text-[15px]">
                            {sub.label}
                            <span className="ml-1.5 text-[12px] text-gray-400">
                              ({sub.pontos} pts)
                            </span>
                          </span>
                        </label>
                      ))}
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <TagPontuacao valor={calc.p3} />
          </fieldset>

          {/* Tecnologia e Procedimentos Construtivos Sustentáveis */}
          <fieldset className="mt-2">
            <legend>
              <TituloSubsecao>
                Tecnologia e Procedimentos Construtivos Sustentáveis
              </TituloSubsecao>
            </legend>
            <p className="text-[15px] text-gray-600 mb-4">
              Selecione todos os elementos aplicáveis. Os itens são{" "}
              <strong>cumulativos</strong> entre si.
            </p>

            <div className="flex flex-col gap-3">
              {TECNOLOGIA_OPCOES.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tecnologiaMarcados.includes(opt.id)}
                    onChange={() =>
                      alternarLista(
                        opt.id,
                        tecnologiaMarcados,
                        setTecnologiaMarcados,
                      )
                    }
                    className="mt-0.5 h-5 w-5 accent-[#0a3297] shrink-0"
                    aria-label={opt.label}
                  />
                  <span className="text-[16px] leading-snug">
                    {opt.label}
                    <span className="ml-1.5 text-[12px] text-gray-400">
                      ({opt.pontos} pts)
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <TagPontuacao valor={calc.p4} />
          </fieldset>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            BONIFICAÇÃO
        ══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="bonificacao-titulo" className="mb-10">
          <h2 id="bonificacao-titulo" className="sr-only">
            Bonificação no percentual de subvenção
          </h2>
          <CabecalhoSecao
            numero="Bonificação"
            titulo="Acréscimo no Percentual de Subvenção"
          />

          <p className="text-[15px] text-gray-600 mb-5">
            Cada item válido acresce <strong>+5%</strong> ao percentual de
            subvenção (S), observando o limite máximo de 25%. Os itens a, b e c
            são <strong>cumulativos entre si</strong>.
          </p>

          {/* Item a */}
          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bonusA}
                onChange={() => setBonusA(!bonusA)}
                className="mt-0.5 h-5 w-5 accent-[#0a3297] shrink-0"
              />
              <span className="text-[16px] leading-snug">
                <strong>(a)</strong> Empreendimento com área total de edificação
                de até <strong>1.500 m²</strong>
                <span className="ml-1.5 text-[12px] text-gray-400">(+5%)</span>
              </span>
            </label>
          </div>

          {/* Item b */}
          <div className="mb-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bonusB}
                onChange={() => setBonusB(!bonusB)}
                className="mt-0.5 h-5 w-5 accent-[#0a3297] shrink-0"
              />
              <span className="text-[16px] leading-snug">
                <strong>(b)</strong> Mudança de uso de imóvel enquadrado nas
                categorias{" "}
                <strong>nR1-14, nR1-15, nR2-12, nR2-13 ou nR3-6</strong>
                <span className="ml-1.5 text-[12px] text-gray-400">(+5%)</span>
              </span>
            </label>
          </div>

          {/* Item c */}
          <fieldset>
            <legend className="text-[16px] font-semibold mb-3">
              <strong>(c)</strong> Composição mínima de área por uso social
              <span className="ml-1.5 text-[12px] text-gray-400 font-normal">
                (+5%, apenas um subitem aplicável)
              </span>
            </legend>

            <div className="ml-5 flex flex-col gap-3">
              {[
                { valor: "none" as BonusC, label: "Nenhum" },
                {
                  valor: "his1_30" as BonusC,
                  label: "No mínimo 30% da área total composta por HIS-1",
                },
                {
                  valor: "his2_40" as BonusC,
                  label: "No mínimo 40% da área total composta por HIS-2",
                },
                {
                  valor: "hmp_50" as BonusC,
                  label: "No mínimo 50% da área total composta por HMP",
                },
              ].map((opt) => (
                <label
                  key={opt.valor}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="bonusC"
                    value={opt.valor}
                    checked={bonusC === opt.valor}
                    onChange={() => setBonusC(opt.valor)}
                    className="h-5 w-5 accent-[#0a3297] shrink-0"
                  />
                  <span className="text-[16px]">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 inline-flex items-center gap-2 bg-gray-100 rounded-sm px-3 py-1.5 text-[13px]">
            <span className="text-gray-500">Bonificação total:</span>
            <span className="font-bold text-[#0a3297]">
              +{calc.numBonus * 5}%
            </span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            VALORES FINANCEIROS
        ══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="valores-titulo" className="mb-10">
          <h2 id="valores-titulo" className="sr-only">
            Valores financeiros do projeto
          </h2>
          <CabecalhoSecao
            numero="Valores"
            titulo="Valores do Projeto (opcional)"
          />

          <p className="text-[15px] text-gray-600 mb-6">
            Preencha para calcular o <strong>montante estimado</strong> da
            subvenção em reais. Os valores devem seguir os parâmetros da ABNT
            NBR 12.721.
          </p>

          <div className="flex flex-col gap-6 max-w-sm">
            {/* Vp */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vp" className="text-[16px] font-semibold">
                Valor total do projeto – Vp
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] pointer-events-none select-none">
                  R$
                </span>
                <input
                  id="vp"
                  type="number"
                  min="0"
                  step="0.01"
                  value={vp}
                  onChange={(e) => setVp(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm pl-10 pr-3 py-2.5 text-[16px] focus:outline-none focus:border-[#0a3297] focus:ring-1 focus:ring-[#0a3297]"
                  placeholder="0,00"
                />
              </div>
              <p className="text-[12px] text-gray-400">
                Valor total conforme ABNT NBR 12.721
              </p>
            </div>

            {/* Vn */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vn" className="text-[16px] font-semibold">
                Valores não computáveis – Vn
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] pointer-events-none select-none">
                  R$
                </span>
                <input
                  id="vn"
                  type="number"
                  min="0"
                  step="0.01"
                  value={vn}
                  onChange={(e) => setVn(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm pl-10 pr-3 py-2.5 text-[16px] focus:outline-none focus:border-[#0a3297] focus:ring-1 focus:ring-[#0a3297]"
                  placeholder="0,00"
                />
              </div>
              <p className="text-[12px] text-gray-400">
                Serviços não essenciais à requalificação edilícia
              </p>
            </div>

            {vpMenorQueVn && (
              <p
                className="text-[13px] text-red-600 font-semibold"
                role="alert"
              >
                ⚠ O valor não computável (Vn) é maior que o valor total do
                projeto (Vp).
              </p>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            RESULTADO
        ══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="resultado-titulo" aria-live="polite">
          <h2 id="resultado-titulo" className="sr-only">
            Resultado da simulação
          </h2>
          <CabecalhoSecao numero="Resultado" titulo="Resultado da Simulação" />

          <div className="bg-[#e7e6f0] rounded-sm p-6">
            {/* Cards de resultado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* P – Pontuação total */}
              <div className="bg-white rounded-sm p-4 flex flex-col items-center text-center shadow-sm">
                <p
                  className={`${dmSans.className} text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1`}
                >
                  Pontuação Total
                </p>
                <p
                  className={`${dmSans.className} text-[38px] font-bold text-[#0a3297] leading-none`}
                >
                  {NUM.format(calc.P)}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">de 100 pontos</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                  <div
                    className="bg-[#0a3297] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${calc.P}%` }}
                  />
                </div>
              </div>

              {/* S – % de Subvenção */}
              <div className="bg-white rounded-sm p-4 flex flex-col items-center text-center shadow-sm">
                <p
                  className={`${dmSans.className} text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1`}
                >
                  % de Subvenção (S)
                </p>
                <p
                  className={`${dmSans.className} text-[38px] font-bold text-[#0a3297] leading-none`}
                >
                  {NUM.format(calc.S)}
                  <span className="text-[22px]">%</span>
                </p>
                <p className="text-[12px] text-gray-400 mt-1">máximo de 25%</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                  <div
                    className="bg-[#0a3297] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(calc.S / 25) * 100}%` }}
                  />
                </div>
              </div>

              {/* Vs – Valor da Subvenção */}
              <div
                className={`rounded-sm p-4 flex flex-col items-center text-center shadow-sm ${
                  temFinanceiro && !vpMenorQueVn ? "bg-white" : "bg-white/60"
                }`}
              >
                <p
                  className={`${dmSans.className} text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1`}
                >
                  Valor da Subvenção (Vs)
                </p>
                {temFinanceiro && !vpMenorQueVn ? (
                  <>
                    <p
                      className={`${dmSans.className} text-[26px] font-bold text-green-700 leading-tight`}
                    >
                      {BRL.format(calc.Vs)}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {NUM.format(calc.S)}% ×{" "}
                      {BRL.format(calc.vpNum - calc.vnNum)}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className={`${dmSans.className} text-[38px] font-bold text-gray-200 leading-none`}
                    >
                      —
                    </p>
                    <p className="text-[12px] text-gray-400 mt-1">
                      {vpMenorQueVn
                        ? "Valores inválidos"
                        : "Preencha Vp e Vn acima"}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Detalhamento */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm">
              <button
                type="button"
                aria-expanded={detalheAberto}
                aria-controls="detalhamento-pontuacao"
                onClick={() => setDetalheAberto(!detalheAberto)}
                className={`${dmSans.className} w-full flex items-center justify-between px-4 py-3 text-[14px] font-semibold text-[#0a3297] hover:bg-gray-50 transition-colors`}
              >
                <span>Ver detalhamento da pontuação</span>
                <span
                  aria-hidden="true"
                  className={`text-lg transition-transform duration-300 ${detalheAberto ? "rotate-90" : "rotate-0"}`}
                >
                  ▶
                </span>
              </button>

              <div
                id="detalhamento-pontuacao"
                className={`grid transition-all duration-300 ease-out ${
                  detalheAberto
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                    <table
                      className="w-full text-[14px]"
                      aria-label="Detalhamento da pontuação"
                    >
                      <thead>
                        <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                          <th className="py-1.5 font-semibold">Critério</th>
                          <th className="py-1.5 font-semibold text-right">
                            Pontos obtidos
                          </th>
                          <th className="py-1.5 font-semibold text-right">
                            Máximo
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr>
                          <td className="py-1.5">Uso do Imóvel</td>
                          <td className="py-1.5 text-right font-semibold">
                            {NUM.format(calc.p1)}
                          </td>
                          <td className="py-1.5 text-right text-gray-400">
                            30
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5">
                            Valorização do Patrimônio Histórico
                          </td>
                          <td className="py-1.5 text-right font-semibold">
                            {NUM.format(calc.p2)}
                          </td>
                          <td className="py-1.5 text-right text-gray-400">
                            20
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5">
                            Integração com a Dinâmica Urbana
                          </td>
                          <td className="py-1.5 text-right font-semibold">
                            {NUM.format(calc.p3)}
                          </td>
                          <td className="py-1.5 text-right text-gray-400">
                            55
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5">
                            Tecnologia Construtiva Sustentável
                          </td>
                          <td className="py-1.5 text-right font-semibold">
                            {NUM.format(calc.p4)}
                          </td>
                          <td className="py-1.5 text-right text-gray-400">
                            25
                          </td>
                        </tr>
                        <tr className="border-t border-gray-200 font-bold">
                          <td className="py-1.5">Pontuação total (P)</td>
                          <td className="py-1.5 text-right text-[#0a3297]">
                            {NUM.format(calc.P)}
                          </td>
                          <td className="py-1.5 text-right text-gray-400">
                            100
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <hr className="my-3 border-gray-100" />

                    <table
                      className="w-full text-[14px]"
                      aria-label="Cálculo do percentual de subvenção"
                    >
                      <tbody className="divide-y divide-gray-50">
                        <tr>
                          <td className="py-1.5">S base = P × 0,25</td>
                          <td className="py-1.5 text-right font-semibold">
                            {NUM.format(calc.sBase)}%
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5">
                            Bonificação ({calc.numBonus}{" "}
                            {calc.numBonus === 1 ? "item" : "itens"} × 5%)
                          </td>
                          <td className="py-1.5 text-right font-semibold">
                            +{calc.numBonus * 5}%
                          </td>
                        </tr>
                        <tr className="font-bold">
                          <td className="py-1.5">
                            Percentual de subvenção (S)
                          </td>
                          <td className="py-1.5 text-right text-[#0a3297]">
                            {NUM.format(calc.S)}%
                          </td>
                        </tr>
                        {temFinanceiro && !vpMenorQueVn && (
                          <>
                            <tr>
                              <td className="py-1.5">Vp − Vn</td>
                              <td className="py-1.5 text-right font-semibold">
                                {BRL.format(calc.vpNum - calc.vnNum)}
                              </td>
                            </tr>
                            <tr className="font-bold">
                              <td className="py-1.5">Vs = (Vp − Vn) × S/100</td>
                              <td className="py-1.5 text-right text-green-700">
                                {BRL.format(calc.Vs)}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota legal */}
            <p className="mt-4 text-[12px] text-gray-500 leading-relaxed">
              Simulação baseada no Anexo II do Decreto Municipal nº 62.878/2023.
              Fórmulas: <em>S = P × 0,25</em> e{" "}
              <em>Vs = (Vp − Vn) × (S/100)</em>. Os resultados são estimativas e
              não substituem a análise técnica da SMUL.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
