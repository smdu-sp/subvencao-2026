import Article from "../components/Article";
import GoBack from "../components/GoBack";
import { DM_Sans, Open_Sans } from "next/font/google";

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
    <div className="text-black w-316 mx-auto mt-5 pt-11 bg-amber-100">
      <section className="flex flex-col w-209 mx-auto">
        <GoBack></GoBack>
        <div className={`mt-6 ${openSans.className} text-lg`}>
          Confira os editais de credenciamento para os projetos de
          requalificação edilícia em imóveis localizados no perímetro do
          Programa Requalifica Centro:
        </div>
        <div
          className={`flex flex-col mt-8 mb-4 ${openSans.className} text-lg`}
        >
          <b className={`${dmSans.className} text-lg`}>
            Chamamento Público nº 01/2025/SMUL
          </b>
          <p>
            <strong>Objetivo:</strong> Credenciar projetos que promovam
            intervenções de requalificação edilícia em imóveis localizados no
            perímetro do Programa Requalifica Centro ao recebimento de subvenção
            econômica.
          </p>
          <a
            className="text-blue-800 underline"
            href="https://capital.sp.gov.br/web/licenciamento/w/acesso_a_informacao/chamamento_publico/chamamento_publico_01-2025"
          >
            Saiba mais aqui
          </a>
        </div>
        <hr />
        <div
          className={`flex flex-col mt-10 mb-4 ${openSans.className} text-lg`}
        >
          <b className={`${dmSans.className} text-lg`}>
            Chamamento Público nº 02/2024/SMUL
          </b>
          <p>
            <b>Objetivo:</b> Credenciar projetos que promovam intervenções de
            requalificação edilícia em imóveis localizados no perímetro do
            Programa Requalifica Centro ao recebimento de subvenção econômica.
          </p>
          <a
            className="text-blue-800 underline"
            href="https://capital.sp.gov.br/web/licenciamento/w/acesso_a_informacao/366075"
          >
            Saiba mais aqui
          </a>
        </div>
        <hr />
        <div className={`flex flex-col mt-10 ${openSans.className} text-lg`}>
          <b className={`${dmSans.className} text-lg`}>
            Chamamento Público nº 01/2023/SMUL
          </b>
          <p>
            <b>Objetivo:</b> Credenciar projetos que promovam intervenções de
            requalificação edilícia em imóveis localizados no perímetro do
            Programa Requalifica Centro ao recebimento de subvenção econômica.
          </p>
          <a
            className="text-blue-800 underline"
            href="https://capital.sp.gov.br/web/licenciamento/w/acesso_a_informacao/363647"
          >
            Saiba mais aqui
          </a>
        </div>
        <Article/>
      </section>
    </div>
  );
};

export default Editais;
