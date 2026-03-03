import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" text-white flex flex-col items-center justify-center w-full">
      <nav className="max-w-325">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex max-w-8xl justify-center items-center">
            <Image src="/headerImage.png" alt="Logo" width={1920} height={1080} className="" />
          </Link>
        </div>
        <div className="flex space-x-8.5 mt-4">
          <Link
            className="p-4 font-bold bg-(--button-background) text-[26px] rounded-sm w-75 text-center hover:underline ease-in-out duration-500 transition-all flex flex-col items-center justify-center"
            href="/Inscricoes"
          >
            Inscrições
          </Link>
          <Link
            className="p-4 font-bold bg-(--button-background) text-[26px] rounded-sm w-75 text-center hover:underline ease-in-out duration-500 transition-all flex flex-col items-center justify-center "
            href="/Editais"
          >
            Editais
          </Link>
          <Link
            className="p-4 font-bold bg-(--button-background) text-[26px] rounded-sm w-75 text-center hover:underline ease-in-out duration-500 transition-all flex flex-col items-center justify-center"
            href="/Prestacao"
          >
            <span>Prestação de Contas</span>
            <span className="text-xl">para subvencionados</span>
          </Link>
          <Link
            className="p-4 font-bold bg-(--button-background) text-[26px] rounded-sm w-75 text-center hover:underline ease-in-out duration-500 transition-all flex flex-col items-center justify-center "
            href="/Transparencia"
          >
            Transparencia
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
