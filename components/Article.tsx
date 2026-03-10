import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-sans",
});

const Article = () => {
  return (
    <div
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
      <p className="text-sm sm:text-base">
        Denúncias de irregularidades devem ser encaminhadas para o e-mail{" "}
        <a
          href="mailto:subvencao@prefeitura.sp.gov.br"
          className="underline wrap-break-word"
        >
          subvencao@prefeitura.sp.gov.br
        </a>
      </p>

      <p className="mt-4 text-sm sm:text-base">
        Material de apoio | Logos Oficiais SMUL e Prefeitura de São Paulo:{" "}
        <a
          href="https://drive.google.com/drive/folders/1TrWlwbbC1akFy_Xb0lsYIgHxQBmnYxnH"
          className="underline wrap-break-word"
          target="_blank"
          rel="noopener noreferrer"
        >
          Logos | Identidade 2023 | Oficiais - Google Drive
        </a>
      </p>
    </div>
  );
};

export default Article;