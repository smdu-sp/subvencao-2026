import Image from "next/image";
import Link from "next/link";
import { MockButtonHeader } from "./MockButtonHeadr";
import ButtonHeader from "./ButtonHeader";

const Header = () => {
  return (
    <header className=" text-white flex flex-col items-center justify-center w-full">
      <nav className="max-w-325">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="flex max-w-8xl justify-center items-center">
            <Image src="/header.png" alt="Logo" width={1300} height={133} className="max-h-33.25" />
          </Link>
        </div>
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 l:gap-8.5 mt-4 max-[1320px]:px-4">
          {MockButtonHeader.map((button) => (
            <ButtonHeader key={button.id} href={button.href} label={button.label} subLabel={button.subLabel} />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
