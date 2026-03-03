import { titles } from "../data/titles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: titles[3].title
}

const Transparencia = () => {
  return (
    <div>
      <h1>Transparência</h1>
    </div>
  );
};

export default Transparencia;
