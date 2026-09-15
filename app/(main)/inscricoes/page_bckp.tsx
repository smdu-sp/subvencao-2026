import { RiExternalLinkLine } from "react-icons/ri";

const links = {
  inscricao: "https://processos.prefeitura.sp.gov.br/Forms/PedidoEletronico1.aspx",
  senhaweb: "https://capital.sp.gov.br/web/fazenda/servicos/senhaweb",
  solicitacao_acesso: "/documents/Passo-a-Passo-de-acesso-ao-Portal-de-Processos-da-PMSP-1.pdf",
};

const Inscricoes = () => {
  return (
    <main id="main-content">
      <section
        aria-labelledby="titulo-chamamento"
        className="text-black max-w-6xl mx-auto px-4 mt-5 pt-11 bg-white flex flex-col gap-5"
      >
        <header>
          <h1
            id="titulo-chamamento"
            className="text-[#0a3297] text-[26px] font-bold"
          >
            Fique atento!
          </h1>
        </header>

        <div className="text-[18px]">
          {/* <strong>Inscrições de 18/04/2025 a 06/07/2025</strong> */}

          <p>
            A Prefeitura de São Paulo, por meio da Secretaria Municipal de Urbanismo e Licenciamento (SMUL), abrirá, em breve, novo Chamamento Público para que interessados em requalificar imóveis no centro da cidade apresentem seus projetos e solicitem subvenção econômica do Município para executar as obras.
          </p>
        </div>

        {/* <div className="bg-[#e7e6f0] p-4 text-[18px] mt-4.5 mb-9 w-fit rounded-sm">
          <a
            href={links.inscricao}
            className="inline-flex items-center gap-2 p-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <strong>Faça sua inscrição</strong>
            </span>

            <RiExternalLinkLine
              className="text-2xl"
              aria-hidden="true"
            />

            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div> */}

        <section aria-labelledby="titulo-senhaweb">
          <h2 id="titulo-senhaweb" className="text-[26px] mb-5 font-bold">
            Orientações para obtenção de Senha Web
          </h2>

          <div className="text-[18px]">
            <p className="mb-5">
              As <strong>SOLICITAÇÕES</strong> para os Chamamentos Públicos
              serão realizadas através do Portal de Processos.
            </p>

            <p className="mb-5">
              Portanto, é necessário que o{" "}
              <strong>RESPONSÁVEL PELO IMÓVEL</strong> possua a Senha Web, que é
              obtida por meio do preenchimento de um cadastro eletrônico e
              permite o acesso a áreas restritas do Portal da Prefeitura.
            </p>

            <p className="mb-5">
              Para cadastro e maiores informações,{" "}
              <a
                className="underline text-[#0a3297]"
                href={links.senhaweb}
                target="_blank"
                rel="noopener noreferrer"
              >
                acesse o site da Senha Web
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>

            <p className="mb-5">
              Recomenda-se que os{" "}
              <strong>RESPONSÁVEIS PELOS IMÓVEIS</strong> solicitem a Senha Web
              com a devida antecedência, de modo que haja tempo hábil de sua
              liberação para que, assim, a <strong>SOLICITAÇÃO</strong> seja
              feita dentro do prazo definido.
            </p>
          </div>
        </section>

        {/* <section aria-labelledby="titulo-portal-processos">
          <h2
            id="titulo-portal-processos"
            className="text-[26px] mb-5 font-bold"
          >
            Orientações para solicitação no Portal de Processos
          </h2>

          <div className="text-[18px]">
            <p className="mb-5">
              Confira o passo a passo para a solicitação no Portal de Processos
              da PMSP:{" "}
              <a
                className="underline text-[#0a3297]"
                href={links.solicitacao_acesso}
                target="_blank"
                rel="noopener noreferrer"
              >
                acessar o guia em PDF
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>

            <p className="mb-5">
              O <strong>Tipo de Requerimento</strong> a ser escolhido é{" "}
              <strong>
                “REQUERIMENTO PADRÃO DE SOLICITAÇÃO DE SUBVENÇÃO ECONÔMICA”.
              </strong>
            </p>

            <p className="mb-5">
              Todos os modelos contidos no{" "}
              <strong>
                Anexo III – Modelo para Apresentação de Documentos dos Projetos
                para Preenchimento no SEI
              </strong>{" "}
              são apenas informativos, a título de consulta, e deverão ser
              preenchidos diretamente no Portal de Processos no momento da{" "}
              <strong>SOLICITAÇÃO</strong>.
            </p>

            <p className="mb-5">
              Os modelos do{" "}
              <strong>
                Anexo IV – Modelo para Apresentação de Documentos dos Projetos
              </strong>{" "}
              deverão ser preenchidos antecipadamente e anexados ao final da{" "}
              <strong>SOLICITAÇÃO</strong>.
            </p>

            <p className="mb-5">
              A Solicitação deve ser realizada de forma completa, respeitando o
              preenchimento de todos os campos, o upload dos documentos anexos
              e, por fim, a assinatura eletrônica através da SenhaWeb.
              <strong>
                {" "}
                Sua solicitação só estará concluída quando for gerado um número
                de Processo no formato “6068.2025/xxxxxxx-x”.
              </strong>
            </p>

            <p className="mb-5">
              Caso você já tenha a SenhaWeb,{" "}
              <a
                className="underline text-[#0a3297]"
                href={links.inscricao}
                target="_blank"
                rel="noopener noreferrer"
              >
                realizar inscrição no portal
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
          </div>
        </section> */}
      </section>
    </main>
  );
};

export default Inscricoes;