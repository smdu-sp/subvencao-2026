import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";

const GoBack = () => {
  return (
    <Link href="/" className="flex w-full justify-start gap-2 text-sm text-black">
      <RiArrowGoBackLine size={20} />
      Voltar
    </Link>
  );
};

export default GoBack;
