"use client";

import Link from "next/link";
import GoBack from "../../../components/GoBack";
import { DM_Sans } from "next/font/google";
import DetailsTransparency from "../../../components/DetailsTransparency";
import { chamamentos2023, chamamentos2024, chamamentos2025 } from "../../../components/MockDetailsTransparency";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const Transparencia = () => {
  return (
    <>
      <div>
        <p className="text-lg">Conheça os empreendimentos que foram credenciados para a subvenção econômica.</p>
        <Link href="https://legislacao.prefeitura.sp.gov.br/leis/decreto-62878-de-30-de-outubro-de-2023" className="text-(--button-background) underline text-lg" target="_blank">
          Entenda o caso.
        </Link>
      </div>

      {chamamentos2025.map((grupo) => (
        <DetailsTransparency key={grupo.id} headerTitle={grupo.headerTitle} items={grupo.items} color="#cc3971" />
      ))}
      {chamamentos2024.map((grupo) => (
        <DetailsTransparency key={grupo.id} headerTitle={grupo.headerTitle} items={grupo.items} color="#f38943" />
      ))}
      {chamamentos2023.map((grupo) => (
        <DetailsTransparency key={grupo.id} headerTitle={grupo.headerTitle} items={grupo.items} color="#517bec" />
      ))}
      <div className="mt-20 w-full rounded-sm bg-[#f6f6f8] px-2 py-4 text-base leading-relaxed text-black">
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
    </>
  );
};

export default Transparencia;
