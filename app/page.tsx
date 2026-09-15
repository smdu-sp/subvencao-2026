"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapLegend } from "@/components/map-legend";

const MapView = dynamic(() => import("@/components/map").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full bg-muted animate-pulse rounded"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Carregando mapa interativo</span>
    </div>
  ),
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="flex justify-center mt-4" id="main-content">
      <section
        aria-labelledby="titulo-mapa-programa"
        className="flex max-md:flex-col max-md:gap-5 relative w-full max-w-360 md:h-180 bg-white py-5 px-4"
      >
        <h1 id="titulo-mapa-programa" className="sr-only">
          Mapa do Programa de Subvenção Econômica do Centro
        </h1>

        <aside
          id="painel-informacoes"
          className={`w-full md:absolute md:h-170 top-5 left-4 bg-white z-10 overflow-hidden shrink-0
          md:transition-[width] md:duration-700 md:ease-in-out ${
            isOpen ? "md:w-80" : "md:w-0"
          }`}
        >
          <div className="flex flex-col gap-3 min-w-80 pl-1 pr-5">
            <h2 className="text-base font-bold text-[#0a3297] leading-tight">
              Subvenção Econômica para o Centro
            </h2>

            <p className="text-base text-black leading-snug tracking-tight">
              A Prefeitura está investindo na transformação do centro de
              São Paulo. Por meio do Programa de Subvenção Econômica,
              imóveis da região podem receber incentivo financeiro para
              obras de retrofit, com foco especial na criação de moradias
              de interesse social.
            </p>

            <p className="text-base text-black leading-snug tracking-tight">
              Prevista no Plano Urbanístico do Centro (Lei nº 17.844/2022)
              e regulamentada pelo Decreto nº 62.878/2023, a iniciativa
              promove chamamentos públicos para selecionar
              empreendimentos e viabilizar a requalificação de edifícios
              subutilizados.
            </p>

            <p className="text-base text-black leading-snug tracking-tight">
              Aqui você encontra informações sobre os empreendimentos
              contemplados, as regras do programa e a prestação de contas
              das ações realizadas.
            </p>
          </div>
        </aside>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="painel-informacoes"
          aria-label={isOpen ? "Fechar painel de informações" : "Abrir painel de informações"}
          className={`absolute top-5 z-50 bg-[#a6bbf5] hover:bg-[#a6bbf5] rounded-l-none text-white cursor-pointer shadow-md hidden md:flex w-10 h-14
          transition-[left] duration-700 ease-in-out ${
            isOpen ? "left-84" : "left-4"
          }`}
        >
          <ChevronLeft
            aria-hidden="true"
            className={`transition-transform duration-700 ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        <section
          role="region"
          aria-labelledby="titulo-mapa"
          aria-describedby="descricao-mapa"
          className="relative w-full h-160 dvh md:h-full rounded overflow-hidden flex flex-col"
        >
          <h2 id="titulo-mapa" className="sr-only">
            Mapa interativo dos empreendimentos
          </h2>

          <p id="descricao-mapa" className="sr-only">
            Trata-se de um mapa da região central da cidade de São Paulo. O mapa destaca uma área principal denominada “Perímetro Requalifica Centro”, representada pela cor azul, indicando a região foco de requalificação urbana.

            Além dessa área central, o mapa apresenta duas zonas adicionais de intervenção urbana: as Áreas de Intervenção Urbana Consolidada, indicadas por linhas tracejadas na cor laranja queimado, e as Áreas de Intervenção Urbana Expandida, indicadas por linhas tracejadas na cor lilás.

            O mapa também sinaliza diversos pontos onde estão localizados empreendimentos vinculados ao programa, distribuídos em três chamamentos públicos.

            No primeiro chamamento (01/2023/SMUL), há empreendimentos nos bairros República e Santa Ifigênia.

            No segundo chamamento (02/2024/SMUL), há ampliação para locais como Largo do Arouche, Rua Santa Isabel, Rua Marquês de Itu, Avenida São João e Rua Sete de Abril.

            No terceiro chamamento (01/2025/SMUL), há novos empreendimentos em vias como Avenida Rio Branco, Avenida Ipiranga, Avenida São João e Rua Líbero Badaró, incluindo edifícios como Copan e Martinelli.

            O mapa apresenta a delimitação do programa, os tipos de intervenção urbana e a distribuição dos empreendimentos ao longo das três fases.
          </p>

          <MapView />

          <MapLegend />
        </section>
      </section>
    </main>
  );
}