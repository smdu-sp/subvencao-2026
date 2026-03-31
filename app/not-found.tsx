import { Button } from '@/components/ui/button'
import { DM_Sans } from "next/font/google";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

function NotFound() {
  return (
    <main className={`${dmSans.className} flex flex-col items-center justify-start  gap-6 p-4 pt-[19vh]`}>
      
      <h1 className="text-[38px] leading-tight text-center font-bold">
        Página Não Encontrada
      </h1>
      
      <p className="text-[24px] text-gray-800 text-center max-w-md">
        Não encontramos a página que você tentou acessar.
      </p>

      <Button
        className={`${dmSans.className} bg-[#0A3297] hover:bg-[#082a7d] text-white px-8 py-6 text-[22px] transition-colors`}
      >
        <Link href="/" aria-label="Voltar para a página inicial">
          <strong>Continue navegando</strong>
        </Link>
      </Button>
    </main>
  )
}

export default NotFound