"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";

const routeTitles: Record<string, string> = {
  "/Inscricoes": "Inscrições",
  "/Editais": "Editais",
  "/Prestacao": "Prestação de Contas",
  "/Transparencia": "Transparência",
};

const RouteHeader = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <Header />;
  }

  const title = routeTitles[pathname] ?? "Página";

  return (
    <header className="text-white flex flex-col items-center justify-center w-full">
      <nav className="max-w-316.5">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex max-w-8xl justify-center items-center">
            <Image src="/HeaderImage.png" alt="Logo" width={1920} height={1080} />
          </Link>
        </div>
        <div className="mx-auto mt-4 w-full max-w-316.5 px-8">
          <div className="w-full max-w-316.5 rounded-sm bg-(--button-background) py-4  text-left pl-52 text-lg font-bold text-white">
            <p className="max-w-250 px-53.7">{title}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default RouteHeader;
