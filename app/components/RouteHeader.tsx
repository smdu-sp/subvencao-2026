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
      <nav className="w-full max-w-316.5">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex w-full max-w-8xl justify-center items-center px-3 sm:px-6">
            <Image src="/HeaderImage.png" alt="Logo" width={1920} height={1080} />
          </Link>
        </div>
        <div className="mx-auto mt-3 w-full max-w-316.5 px-3 sm:mt-4 sm:px-8">
          <div className="w-full max-w-316.5 rounded-sm bg-(--button-background) py-3 text-base font-bold text-white sm:py-4 sm:text-lg">
            <p className="mx-auto w-full max-w-215 px-4 text-center sm:px-8 md:text-left">{title}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default RouteHeader;
