import Link from "next/link";

const Editais = () => {
  return (
    <div className="text-black">
      <h1>Editais</h1>
      <section className="flex flex-col ">
        <Link href="/">Voltar</Link>
        <p>
          Confira os editais de credenciamento para os projetos de
          requalificação edilícia em imóveis localizados no perímetro do
          Programa Requalifica Centro:
        </p>
        <span className="flex flex-col mt-8 mb-4">
          <b>Chamamento Público nº 01/2025/SMUL</b>
          <br />
          <b>Objetivo:</b> Credenciar projetos que promovam intervenções de
          requalificação edilícia em imóveis localizados no perímetro do
          Programa Requalifica Centro ao recebimento de subvenção econômica.
          <br />
          <a
            className="text-blue-800 underline cursor-pointer"
            href="https://capital.sp.gov.br/web/licenciamento/w/acesso_a_informacao/chamamento_publico/chamamento_publico_01-2025"
          >
            Saiba mais aqui
          </a>
        </span>
        <hr />
        <span className="flex flex-col mt-10 mb-4">
          <b>Chamamento Público nº 02/2024/SMUL</b>
          <br />
          <b>Objetivo:</b> Credenciar projetos que promovam intervenções de
          requalificação edilícia em imóveis localizados no perímetro do
          Programa Requalifica Centro ao recebimento de subvenção econômica.
          <br />
          <a
            className="text-blue-800 underline cursor-pointer"
            href="https://capital.sp.gov.br/web/licenciamento/w/acesso_a_informacao/366075"
          >
            Saiba mais aqui
          </a>
        </span>
        <hr />
        <span className="flex flex-col mt-10 ">
          <b>Chamamento Público nº 01/2023/SMUL</b>
          <br />
          <b>Objetivo:</b> Credenciar projetos que promovam intervenções de
          requalificação edilícia em imóveis localizados no perímetro do
          Programa Requalifica Centro ao recebimento de subvenção econômica.
          <br />
          <a
            className="text-blue-800 underline cursor-pointer"
            href="https://capital.sp.gov.br/web/licenciamento/w/acesso_a_informacao/363647"
          >
            Saiba mais aqui
          </a>
        </span>
      </section>

    </div>
  );
};

export default Editais;
