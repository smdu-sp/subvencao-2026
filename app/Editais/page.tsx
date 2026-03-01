import Article from "../components/Article";
import GoBack from "../components/GoBack";
import { DM_Sans, Open_Sans } from "next/font/google";
import { editais } from "../data/editais";
import { titles } from "../data/titles";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: titles[1].title
}

const Editais = () => {
  return (
    <div className="text-black w-325 mx-auto mt-5 pt-11 bg-white">
      <section className="flex flex-col w-209.5 mx-auto">
        <GoBack></GoBack>
        <div className={`mt-6 ${openSans.className} text-lg`}>
          Confira os editais de credenciamento para os projetos de
          requalificação edilícia em imóveis localizados no perímetro do
          Programa Requalifica Centro:
        </div>
        {editais.map((edital, index) => (
          <div key={edital.id}>
            <div className={`flex flex-col mt-8 ${openSans.className} text-lg`}>
              <b className={`${dmSans.className} text-lg`}>
                Chamamento Público nº {edital.numero}
              </b>

              <p>
                <b>Objetivo:</b> Credenciar projetos que promovam intervenções
                de requalificação edilícia em imóveis localizados no perímetro
                do Programa Requalifica Centro ao recebimento de subvenção
                econômica.
              </p>

              <a
                className="text-blue-800 underline"
                href={edital.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais aqui
              </a>
            </div>

            {index !== editais.length - 1 && <hr className="mt-6" />}
          </div>
        ))}
        <Article />
      </section>
    </div>
  );
};

export default Editais;
