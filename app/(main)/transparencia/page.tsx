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
// TODO: Verificar dois asides existentes
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
            Entender o decreto que regulamenta a subvenção econômica
            <span className="sr-only"> (abre em nova aba)</span>
          </Link>
        </header>

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

        {/* <aside
          aria-labelledby="titulo-contato-denuncia"
          className="mt-20 w-full rounded-sm bg-[#f6f6f8] px-4 py-4 text-base leading-relaxed"
        >
          <h2 id="titulo-contato-denuncia" className="sr-only">
            Contato e denúncias
          </h2>

          <p className="text-sm">
            Denúncias de irregularidades devem ser encaminhadas para o e-mail{" "}
            <a
              href="mailto:subvencao@prefeitura.sp.gov.br"
              className="underline"
            >
              subvencao@prefeitura.sp.gov.br
            </a>
          </p>

          <p className="text-sm mt-2">
            Material de apoio — Logos oficiais da Secretaria Municipal de
            Urbanismo e Licenciamento e da Prefeitura de São Paulo:{" "}
            <a
              href="https://drive.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Acessar pasta de logos oficiais no Google Drive
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </aside> */}
      </section>
    </main>
  );
};

export default Transparencia;