import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-sans",
});

const GoBack = () => {
  return (
    <Link href="/" className={`flex items-center gap-2 text-base text-black ${dmSans.className}`}>
      <RiArrowGoBackLine size={20} />
      Voltar
    </Link>
  );
};

export default GoBack;
