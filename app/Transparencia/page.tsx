"use client";

import Link from "next/link";
import GoBack from "../components/GoBack";
import { DM_Sans } from "next/font/google";
import DetailsTransparency from "../components/DetailsTransparency";
import { chamamentos } from "../components/MockDetailsTransparency";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const Transparencia = () => {
  return (
    <main className="flex justify-center px-4 sm:px-6">
      <div className={`flex w-full max-w-228 flex-col items-start gap-8 rounded-lg px-0 py-6 sm:p-8 ${dmSans.className}`}>
        <GoBack />
        <div>
          <p className="text-lg">Conheça os empreendimentos que foram credenciados para a subvenção econômica.</p>
          <Link href="https://legislacao.prefeitura.sp.gov.br/leis/decreto-62878-de-30-de-outubro-de-2023" className="text-(--button-background) underline text-lg" target="_blank">
            Entenda o caso.
          </Link>
        </div>

        {chamamentos.map((grupo) => (
          <DetailsTransparency key={grupo.id} headerTitle={grupo.headerTitle} items={grupo.items} color="#cc3971" />
        ))}
      </div>
    </main>
  );
};

export default Transparencia;
