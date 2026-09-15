"use client";

import Link from "next/link";
import { DM_Sans } from "next/font/google";
import DetailsTransparency from "../../../components/DetailsTransparency";
import {
  chamamentos2023,
  chamamentos2024,
  chamamentos2025,
} from "../../../components/MockDetailsTransparency";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const Transparencia = () => {
  return (
    <main id="main-content">
      <section
        aria-labelledby="titulo-transparencia"
        className="max-w-6xl mx-auto px-4 mt-5 pt-11 bg-white text-black"
      >
        <header className="mb-6">
          <h1
            id="titulo-transparencia"
            className={`${dmSans.className} text-2xl font-bold`}
          >
            Transparência do Programa
          </h1>

          <p className="text-lg mt-2">
            Conheça os empreendimentos que foram credenciados para a
            subvenção econômica.
          </p>

          <Link
            href="https://legislacao.prefeitura.sp.gov.br/leis/decreto-62878-de-30-de-outubro-de-2023"
            className="text-(--button-background) underline text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Entenda o decreto que regulamenta a subvenção econômica
            <span className="sr-only"> (abre em nova aba)</span>
          </Link>
        </header>
      </section>
      <section className="max-w-6xl mx-auto px-4 mt-5 pt-11 bg-white text-black flex flex-col gap-5">
        <section aria-labelledby="titulo-chamamentos-2025">
          <h2 id="titulo-chamamentos-2025" className="sr-only">
            Chamamentos credenciados em 2025
          </h2>

          {chamamentos2025.map((grupo) => (
            <DetailsTransparency
              key={grupo.id}
              headerTitle={grupo.headerTitle}
              items={grupo.items}
              color="#cc3971"
            />
          ))}
        </section>

        <section aria-labelledby="titulo-chamamentos-2024">
          <h2 id="titulo-chamamentos-2024" className="sr-only">
            Chamamentos credenciados em 2024
          </h2>

          {chamamentos2024.map((grupo) => (
            <DetailsTransparency
              key={grupo.id}
              headerTitle={grupo.headerTitle}
              items={grupo.items}
              color="#f38943"
            />
          ))}
        </section>

        <section aria-labelledby="titulo-chamamentos-2023">
          <h2 id="titulo-chamamentos-2023" className="sr-only">
            Chamamentos credenciados em 2023
          </h2>

          {chamamentos2023.map((grupo) => (
            <DetailsTransparency
              key={grupo.id}
              headerTitle={grupo.headerTitle}
              items={grupo.items}
              color="#517bec"
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Transparencia;