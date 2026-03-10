import Article from "../../../components/Article";
import GoBack from "../../../components/GoBack";
import { DM_Sans } from "next/font/google";
import { RiExternalLinkLine } from "react-icons/ri";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const links = {
  inscricao: "https://processos.prefeitura.sp.gov.br/Forms/PedidoEletronico1.aspx",
  senhaweb: "https://capital.sp.gov.br/web/fazenda/servicos/senhaweb",
  solicitacao_acesso: "https://subvencao.prefeitura.sp.gov.br/wp-content/uploads/2025/04/Passo-a-Passo-de-acesso-ao-Portal-de-Processos-da-PMSP-1.pdf",
};

const Simulacao = () => {
  return <></>
};

export default Simulacao;
