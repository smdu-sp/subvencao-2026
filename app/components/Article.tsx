import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-sans",
});

const Article = () => {
    return (
        <div className={`bg-[#F6F6F8] ${dmSans.className} w-217 p-3 mt-40 mb-19`}>
            <p>Denúncias de irregularidades devem ser encaminhadas para o e-mail <a href="mailto:subvencao@prefeitura.sp.gov.br" className="underline">subvencao@prefeitura.sp.gov.br</a></p>
            <p>Material de apoio | Logos Oficiais SMUL e Prefeitura de São Paulo: <a href="https://drive.google.com/drive/folders/1TrWlwbbC1akFy_Xb0lsYIgHxQBmnYxnH" className="underline">Logos | Identidade 2023 | Oficiais - Google Drive</a></p>
        </div>
    )
}

export default Article