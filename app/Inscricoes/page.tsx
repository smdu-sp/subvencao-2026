import { titles } from "../data/titles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: titles[0].title
}

const Inscricoes = () => {
  return (
    <div>
      <h1>Inscrições</h1>
    </div>
  );
};

export default Inscricoes;
