"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";

const routeTitles: Record<string, string> = {
  "/inscricoes": "Inscrições",
  "/editais": "Editais",
  "/prestacao-de-contas": "Prestação de Contas",
  "/transparencia": "Transparência",
  "/simulacao": "Simulação de Valor de Subvenção",
};

const RouteHeader = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <Header />;
  }

  const title = routeTitles[pathname] ?? "Página não encontrada";

  return (
    <header className="text-white flex flex-col items-center justify-center w-full">
      <nav className="w-full max-w-360">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex w-full justify-center items-center">
            <Image src="/header.png" alt="Logo" width={1440} height={147.31} className="w-full h-auto" priority />
          </Link>
        </div>
        <div className="mx-auto mt-3 w-full max-w-360 sm:mt-4">
          <div
            className="w-full max-[1310px]:rounded-none rounded-sm bg-(--button-background) min-h-16 text-base font-bold text-white text-[26px]"
            style={{ viewTransitionName: "header-btn-" + pathname.replace(/^\//, "").replace(/\//g, "-") }}
          >
            <p className="mx-auto w-full min-h-20 flex items-center max-w-215 text-center md:text-left px-5">{title}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default RouteHeader;
