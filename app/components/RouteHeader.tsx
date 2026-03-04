"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";

const routeTitles: Record<string, string> = {
  "/inscricoes": "Inscrições",
  "/editais": "Editais",
  "/prestacao": "Prestação de Contas",
  "/transparencia": "Transparência",
};

const RouteHeader = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <Header />;
  }

  const title = routeTitles[pathname] ?? "Página";

  return (
    <header className="text-white flex flex-col items-center justify-center w-full">
      <nav className="w-full max-w-325">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex max-w-8xl justify-center items-center">
            <Image src="/header.png" alt="Logo" width={1300} height={133} className="max-h-33.25" />
          </Link>
        </div>
        <div className="mx-auto mt-3 w-full max-w-325 sm:mt-4 ">
          <div className="w-full max-w-325 rounded-sm bg-(--button-background) min-h-16 text-base font-bold text-white text-[26px]">
            <p className="mx-auto w-full min-h-16 flex items-center max-w-215 text-center md:text-left">{title}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default RouteHeader;
