import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-sans",
});

const Article = () => {
  return (
    <aside
      aria-labelledby="titulo-contato"
      className={`
        bg-[#F6F6F8]
        ${dmSans.className}
        w-full
        max-w-4xl
        mx-auto
        px-4 sm:px-6 lg:px-8
        py-4
        mt-16 sm:mt-24 lg:mt-32
        mb-12
        rounded-lg
      `}
    >
      <h2 id="titulo-contato" className="sr-only">
        Informações de contato e material de apoio
      </h2>

      <p className="text-sm sm:text-base">
        Denúncias de irregularidades devem ser encaminhadas para o e-mail{" "}
        <a
          href="mailto:subvencao@prefeitura.sp.gov.br"
          className="underline break-words"
        >
          subvencao@prefeitura.sp.gov.br
        </a>
      </p>

      <p className="mt-4 text-sm sm:text-base">
        Material de apoio — Logos oficiais da Secretaria Municipal de
        Urbanismo e Licenciamento e da Prefeitura de São Paulo:{" "}
        <a
          href="https://drive.google.com/drive/folders/1TrWlwbbC1akFy_Xb0lsYIgHxQBmnYxnH"
          className="underline break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acessar pasta de logos oficiais no Google Drive
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </p>
    </aside>
  );
};

export default Article;