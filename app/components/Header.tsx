import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" text-white flex flex-col items-center justify-center ">
      <div>
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/HeaderImage.png" className="w-full h-full" alt="Logo" width={1920} height={1080} />
        </Link>
      </div>
      <div className="flex space-x-4 mt-2">
        <Link href="/Inscricoes">Inscrições</Link>
        <Link href="/Editais">Editais</Link>
        <Link href="/Prestacao">Prestação de Contas </Link>
        <Link href="/Transparencia">Transparencia</Link>
      </div>
    </header>
  );
};

export default Header;
