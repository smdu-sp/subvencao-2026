import GoBack from "../components/GoBack";
import { titles } from "../data/titles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: titles[2].title
}

const Prestacao = () => {
  return (
    <main className="flex justify-center">
      <div className="flex w-full max-w-316.5 items-start cursor-pointer gap-2 rounded-lg p-8">
        <GoBack />
      </div>
    </main>
  );
};

export default Prestacao;
