import Article from "@/components/Article";
import GoBack from "@/components/GoBack";
import { DM_Sans, Open_Sans } from "next/font/google";
import { editais } from "../data/editais";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dm-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-open-sans",
});
const Editais = () => {
  return (
    <main id="main-content">
      <section 
      aria-labelledby="titulo-editais"
      className="text-black max-w-6xl mx-auto px-4 mt-5 bg-white">
        <h1 id="titulo-editais" className={`${dmSans.className} text-2xl mb-6`}>
          Editais do Programa de Subvenção Econômica
        </h1>
        {editais.map((edital, index) => (
          <article key={edital.id}>
            <div className={`flex flex-col mt-8 ${openSans.className} text-lg`}>
              <h2 className={`${dmSans.className} text-lg`}>
                Chamamento Público nº {edital.numero}
              </h2>

              <p>
                <span className="font-semibold">Objetivo:</span> {edital.objetivo}
              </p>

              {edital.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  className="text-blue-800 underline"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {link.label}
                </a>
              ))}
            </div>

            {index !== editais.length - 1 && (
              <hr className="mt-6" aria-hidden="true" />
            )}
          </article>
        ))}
        <article>
          <div className={`flex flex-col mt-8 ${openSans.className} text-lg`}>
            <h2 className={`${dmSans.className} text-lg`}>
              Apresentação - Roadshow Geral
            </h2>
            <a
              className="text-blue-800 underline"
              href={"/editais/Apresentacao_Roadshow_Geral_4_Edital_Subvencao.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download da apresentação do Roadshow Geral
            </a>
            <hr className="mt-6" aria-hidden="true" />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Editais;
