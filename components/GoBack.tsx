"use client";

import { RiArrowGoBackLine } from "react-icons/ri";
import { DM_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-sans",
});

const GoBack = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="link"
      onClick={() => router.back()}
      aria-label="Voltar para a página anterior"
      className={`flex items-center gap-2 px-0 text-base text-black ${dmSans.className} w-fit`}
    >
      <RiArrowGoBackLine size={20} aria-hidden="true" />
      <span>Voltar</span>
    </Button>
  );
};

export default GoBack;