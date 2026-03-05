"use client";

import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="flex justify-center px-4 sm:px-6">
      <div className="flex w-full max-w-7xl mt-4">
        <SidebarProvider open={isOpen} onOpenChange={setIsOpen} className="min-h-full">
          <Sidebar collapsible="none" className={`transition-all duration-300 ease-in-out overflow-hidden bg-white border-r ${isOpen ? "w-[20rem] opacity-100" : "w-0 opacity-0 border-r-0"}`}>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent className="flex flex-col gap-4">
                  <p className="text-base font-bold text-[#0a3297]">Subvenção Econômica para o Centro: incentivo à requalificação de imóveis e ao adensamento populacional</p>
                  <p className="text-base font-normal text-black">
                    A Prefeitura está investindo na transformação do centro de São Paulo. Por meio do Programa de Subvenção Econômica, imóveis da região podem receber incentivo financeiro para obras
                    de retrofit — com foco especial na criação de moradias de interesse social.
                  </p>
                  <p className="text-base font-normal text-black">
                    Prevista no Plano Urbanístico do Centro (Lei nº 17.844/2022) e regulamentada pelo Decreto nº 62.878/2023, a iniciativa promove chamamentos públicos para selecionar empreendimentos
                    e viabilizar a requalificação de edifícios subutilizados.
                  </p>
                  <p className="text-base font-normal text-black">
                    Aqui, você encontra todas as informações sobre os empreendimentos contemplados, as regras do programa e a prestação de contas das ações realizadas.
                  </p>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="relative p-0 m-0 bg-transparent flex-1 overflow-hidden transition-all duration-300">
            {/* O Trigger vai chamar o nosso setIsOpen automaticamente por conta do SidebarProvider */}
            <SidebarTrigger className="w-10 h-14 absolute z-50 top-0 left-0 bg-[#a6bbf5] rounded-l-none text-white hover:text-black cursor-pointer shadow-md">
              {/* Bônus: A setinha agora gira 180 graus quando o menu está fechado! */}
              <ChevronLeft className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`} />
            </SidebarTrigger>

            <Skeleton className="w-full h-[600px] bg-gray-300 rounded-l-none" />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </main>
  );
}
