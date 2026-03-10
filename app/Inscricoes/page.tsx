import Article from "../components/Article";
import GoBack from "../components/GoBack";
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

const Inscricoes = () => {
  return (
    <div>
      <div className={`text-black max-w-6xl mx-auto px-4 mt-5 pt-11 bg-white ${dmSans.className}`}>
        <section className="flex flex-col max-w-4xl mx-auto w-full">
          <GoBack />
          <h2 className="text-[#0a3297] text-[26px] pt-5.5 pb-5.5 font-bold">Chamamento Público nº 01/2025/SMUL</h2>
          <div className="text-[18px]">
            <strong>Inscrições de 18/04/2025 a 06/07/2025</strong>
            <p>
              A Prefeitura de São Paulo, por meio da Secretaria Municipal de Urbanismo e Licenciamento (SMUL), abriu o <strong>terceiro chamamento público</strong> para que interessados em{" "}
              <strong>requalificar imóveis no centro da cidade</strong> apresentem seus projetos e solicitem subvenção econômica do Município para executar as obras.
            </p>
          </div>
          <div className="bg-[#e7e6f0] p-4 text-[18px] mt-4.5 mb-9 w-fit rounded-sm">
            <a href={links.inscricao} className="inline-flex items-center gap-2 p-1" target="_blank" rel="noopener noreferrer">
              <span>
                <strong>Faça sua inscrição!</strong>
              </span>
              <RiExternalLinkLine className="text-2xl" />
            </a>
          </div>
          <h2 className={"text-[26px] mb-5 font-bold"}>Orientações para obtenção de Senha Web</h2>
          <div className="text-[18px]">
            <p className="mb-5">
              As <strong>SOLICITAÇÕES</strong> para este Chamamento Público serão realizadas através do Portal de Processos.
            </p>
            <p className="mb-5">
              Portanto, é necessário que o <strong>RESPONSÁVEL PELO IMÓVEL</strong> possua a Senha Web, que é obtida por meio do preenchimento de um cadastro eletrônico e permite o acesso a áreas
              restritas do Portal da Prefeitura.
            </p>
            <p className="mb-5">
              Para cadastro e maiores informações,{" "}
              <a className="underline text-[#0a3297]" href={links.senhaweb} target="_blank" rel="noopener noreferrer">
                consulte o site.
              </a>
            </p>
            <p className="mb-5">
              Recomenda-se que os <strong>RESPONSÁVEIS PELOS IMÓVEIS</strong> solicitem a Senha Web com a devida antecedência, de modo que haja tempo hábil de sua liberação para que, assim, a{" "}
              <strong>SOLICITAÇÃO</strong> seja feita dentro do prazo definido.
            </p>
          </div>

          <h2 className="text-[26px] mb-5 font-bold">Orientações para solicitação no Portal de Processos</h2>
          <div className="text-[18px]">
            <p className="mb-5">
              Confira o passo a passo para a solicitação no Portal de Processos da PMSP:{" "}
              <a className="underline text-[#0a3297]" href={links.solicitacao_acesso} target="_blank" rel="noopener noreferrer">
                clique aqui
              </a>
            </p>
            <p className="mb-5">
              O <strong>Tipo de Requerimento</strong> a ser escolhido é <strong>“REQUERIMENTO PADRÃO DE SOLICITAÇÃO DE SUBVENÇÃO ECONÔMICA”.</strong>
            </p>
            <p className="mb-5">
              Todos os modelos contidos no <strong>Anexo III – Modelo para Apresentação de Documentos dos Projetos para Preenchimento no SEI</strong> são apenas informativos, a título de consulta, e
              deverão ser preenchidos diretamente no Portal de Processos no momento da <strong>SOLICITAÇÃO</strong>. Portanto, não há necessidade de serem impressos ou anexados.
            </p>
            <p className="mb-5">
              Os modelos do <strong>Anexo IV – Modelo para Apresentação de Documentos dos Projetos</strong> deverão ser preenchidos antecipadamente e anexados ao final da <strong>SOLICITAÇÃO</strong>,
              nos campos exigidos.
            </p>
            <p className="mb-5">
              A Solicitação deve ser realizada de forma completa, respeitando o preenchimento de todos os campos, o upload dos documentos anexos e, por fim, a assinatura eletrônica através da
              SenhaWeb. <strong>Sua solicitação só estará concluída quando, após a assinatura, for gerado um número de Processo no formato “6068.2025/xxxxxxx-x”.</strong>
            </p>
            <p className="mb-5">
              Caso você já tenha a SenhaWeb,{" "}
              <a className="underline text-[#0a3297]" href={links.inscricao} target="_blank" rel="noopener noreferrer">
                INSCREVA-SE AQUI
              </a>
            </p>
          </div>
          <Article />
        </section>
      </div>
    </div>
  );
};

export default Inscricoes;
