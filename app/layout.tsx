import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import RouteHeader from "../components/RouteHeader";
import { DM_Sans } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subvenção para requalificação de imóveis no centro",
  description: "Subvenção para requalificação de imóveis no centro de São Paulo",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.className} antialiased bg-[#f7f7f9] min-h-screen`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9LKVRLKV2E" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9LKVRLKV2E');`}
        </Script>
        <section className="sr-only">
          <Link href="#main-content" className="focus:not-sr-only focus:absolute focus:top-5 focus:left-5 focus:bg-white focus:p-2 focus:rounded">
            Ir para o conteúdo principal
          </Link>
        </section>
        <RouteHeader />
        <section id="main-content">
          {children}
        </section>
      </body>
    </html>
  );
}
