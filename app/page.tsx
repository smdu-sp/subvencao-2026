"use client";

import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="flex justify-center mt-4">
      <div className="flex w-full max-w-325 bg-white overflow-hidden h-185 rounded">
        <SidebarProvider open={isOpen} onOpenChange={setIsOpen} className="w-full h-full min-h-full">
          <Sidebar
            collapsible="none"
            className={`
              w-[20rem] border-r bg-white transition-all ease-in-out
              duration-700 
              ${isOpen ? "ml-0" : "-ml-[20rem]"}
            `}
          >
            {/* min-w-[20rem] impede que o texto quebre ou diminua durante a animação */}
            <SidebarContent className="min-w-[19rem]">
              <SidebarGroup>
                {/* gap-3 aproxima os blocos de texto */}
                <SidebarGroupContent className="flex flex-col gap-3 p-4">
                  {/* Título com entrelinha justa (leading-tight) */}
                  <p className="text-base font-bold text-[#0a3297] leading-tight">Subvenção Econômica para o Centro: incentivo à requalificação de imóveis e ao adensamento populacional</p>

                  {/* Parágrafos com entrelinha confortável mas compacta (leading-snug) */}
                  <p className="text-base font-normal text-black leading-snug tracking-tight">
                    A Prefeitura está investindo na transformação do centro de São Paulo. Por meio do Programa de Subvenção Econômica, imóveis da região podem receber incentivo financeiro para obras
                    de retrofit — com foco especial na criação de moradias de interesse social.
                  </p>

                  <p className="text-base font-normal text-black leading-snug tracking-tight">
                    Prevista no Plano Urbanístico do Centro (Lei nº 17.844/2022) e regulamentada pelo Decreto nº 62.878/2023, a iniciativa promove chamamentos públicos para selecionar empreendimentos
                    e viabilizar a requalificação de edifícios subutilizados.
                  </p>

                  <p className="text-base font-normal text-black leading-snug tracking-tight">
                    Aqui, você encontra todas as informações sobre os empreendimentos contemplados, as regras do programa e a prestação de contas das ações realizadas.
                  </p>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="relative p-0 m-0 bg-transparent flex-1 overflow-hidden">
            <SidebarTrigger
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-14 absolute z-50 top-0 left-0 bg-[#a6bbf5] rounded-l-none text-white hover:text-black cursor-pointer shadow-md transition-all duration-300"
            >
              {/* O ícone também gira suavemente na mesma velocidade da sidebar (duration-700) */}
              <ChevronLeft className={`transition-transform duration-700 ${!isOpen ? "rotate-180" : ""}`} />
            </SidebarTrigger>

            <Skeleton className="w-full h-full bg-gray-300 rounded-none" />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </main>
  );
}
