"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";

type SummaryCard = {
  label: string;
  value: string;
  valueClassName?: string;
};

type DetailsItem = {
  id: number | string;
  title: string;
  edital: string;
  cnpj: string;
  address: string;
  responsible: string;
  tableUrl: string;
  planUrl: string;
  cards: SummaryCard[];
};

type DetailsTransparencyProps = {
  headerTitle: string;
  color: string;
  items: DetailsItem[];
};

const DetailsTransparency = ({ headerTitle, color, items }: DetailsTransparencyProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative flex w-full items-center justify-between rounded-sm bg-gray-200 py-4 pr-4 text-left">
        <span className="absolute left-0 top-0 h-full w-6 rounded-l-sm" style={{ backgroundColor: color }} />
        <span className="pl-10 pr-6 text-xl font-bold text-black">{headerTitle}</span>
        <RiArrowRightSLine className={`text-4xl text-black transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`} />
      </button>

      <div className={`grid overflow-hidden transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className={`mt-4 w-full border-b-2 border-(--button-background) pb-8 text-black last:border-0 py-6 px-4`}>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="text-base">{item.edital}</p>
              <p className="text-base">{item.address}</p>
              <p className="text-base">{item.responsible}</p>
              <p className="text-base">{item.cnpj}</p>
              <div className="flex flex-col gap-0">
                <Link href={item.tableUrl} className="text-lg underline text-(--button-background)" target="_blank">
                  Tabela de Pontuação
                </Link>
                <Link href={item.planUrl} className="text-lg underline text-(--button-background)" target="_blank">
                  Plano Urbanístico
                </Link>
              </div>

              <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {item.cards.map((card, index) => (
                  <div key={index} className="rounded-sm bg-gray-200 px-2 py-1 text-center">
                    <p className="text-lg font-bold">{card.label}</p>
                    <p className={`text-base font-bold ${card.valueClassName ?? ""}`}>{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsTransparency;
