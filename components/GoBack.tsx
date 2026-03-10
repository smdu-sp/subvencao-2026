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
  const router = useRouter()
  return (
    <Button variant="link" onClick={() => router.back()} className={`flex items-center mt-4 gap-2 px-0 text-base text-black ${dmSans.className} w-fit`}>
      <RiArrowGoBackLine size={20} />
      Voltar
    </Button>
  );
};

export default GoBack;
