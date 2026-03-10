import Image from "next/image";
import Link from "next/link";
import { MockButtonHeader } from "./MockButtonHeadr";
import ButtonHeader from "./ButtonHeader";

const Header = () => {
  return (
    <header className=" text-white flex flex-col items-center justify-center w-full">
      <nav className="max-w-360 w-full">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex w-full justify-center items-center">
            <Image src="/header.png" alt="Logo" width={1440} height={147.31} className="w-full" />
          </Link>
        </div>
        <div className="grid max-[519px]:grid-cols-1 min-[520px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1440px]:grid-cols-5 gap-4 l:gap-8.5 mt-4 max-[1450px]:px-4">
          {MockButtonHeader.map((button) => (
            <ButtonHeader key={button.id} href={button.href} label={button.label} subLabel={button.subLabel} />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
