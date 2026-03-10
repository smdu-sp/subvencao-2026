"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapLegend } from "@/components/map-legend";

const MapView = dynamic(() => import("@/components/map").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded" />,
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="flex justify-center mt-4">
      <section className="flex max-md:flex-col max-md:gap-5 relative w-full max-w-360 md:h-180 bg-white py-5 px-4">
        <section className={`w-full md:absolute md:h-170 top-5 left-4 bg-white z-10 overflow-hidden shrink-0
          md:transition-[width] md:duration-700 md:ease-in-out ${isOpen ? "md:w-80" : "md:w-0"}`}>
          <div className="flex flex-col gap-3 min-w-80 pl-1 pr-5">
            <p className="text-base font-bold text-[#0a3297] leading-tight">Subvenção Econômica para o Centro: incentivo à requalificação de imóveis e ao adensamento populacional</p>
            <p className="text-base font-normal text-black leading-snug tracking-tight">
              A Prefeitura está investindo na transformação do centro de São Paulo. Por meio do Programa de Subvenção Econômica, imóveis da região podem receber incentivo financeiro para obras de retrofit —
              com foco especial na criação de moradias de interesse social.
            </p>
            <p className="text-base font-normal text-black leading-snug tracking-tight">
              Prevista no Plano Urbanístico do Centro (Lei nº 17.844/2022) e regulamentada pelo Decreto nº 62.878/2023, a iniciativa promove chamamentos públicos para selecionar empreendimentos e viabilizar
              a requalificação de edifícios subutilizados.
            </p>
            <p className="text-base font-normal text-black leading-snug tracking-tight">
              Aqui, você encontra todas as informações sobre os empreendimentos contemplados, as regras do programa e a prestação de contas das ações realizadas.
            </p>
          </div>
        </section>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute top-5 z-50 bg-[#a6bbf5] hover:bg-[#a6bbf5] rounded-l-none text-white cursor-pointer shadow-md hidden md:flex w-10 h-14
            transition-[left] duration-700 ease-in-out ${isOpen ? "left-84" : "left-4"}`}
        >
          <ChevronLeft className={`transition-transform duration-700 ${!isOpen ? "rotate-180" : ""}`} />
        </Button>
        <div className="relative w-full h-160 dvh md:h-full rounded overflow-hidden flex flex-col">
          <MapView />
          <MapLegend />
        </div>
      </section>
    </main>
  );
}
