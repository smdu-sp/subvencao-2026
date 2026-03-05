import Link from "next/link";
import "../globals.css";

interface ButtonHeaderProps {
  href: string;
  label: string;
  subLabel?: string;
}

const ButtonHeader = ({ href, label, subLabel }: ButtonHeaderProps) => {
  return (
    <Link className=" h-20 font-bold bg-(--button-background) rounded text-center hover:underline ease-in-out duration-500 transition-all flex flex-col items-center justify-center" href={href}>
      {label && <span className="text-2xl whitespace-nowrap -tracking-tight max-[900px]:text-xl">{label}</span>}
      {subLabel && <span className="text-sm">{subLabel}</span>}
    </Link>
  );
};

export default ButtonHeader;
