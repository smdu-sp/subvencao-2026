"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ButtonHeaderProps {
  href: string;
  label: string;
  subLabel?: string;
}

function hrefToVtName(href: string) {
  return "header-btn-" + href.replace(/^\//, "").replace(/\//g, "-");
}

const ButtonHeader = ({ href, label, subLabel }: ButtonHeaderProps) => {
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    if (!document.startViewTransition) return;
    e.preventDefault();
    document.startViewTransition(() => { router.push(href); });
  }

  return (
    <Link
      className="h-20 font-bold bg-(--button-background) rounded text-center hover:underline ease-in-out duration-500 transition-all flex flex-col items-center justify-center"
      href={href}
      onClick={handleClick}
      style={{ viewTransitionName: hrefToVtName(href) }}
    >
      {label && <span className="text-2xl whitespace-nowrap -tracking-tight max-[900px]:text-xl">{label}</span>}
      {subLabel && <span className="text-sm">{subLabel}</span>}
    </Link>
  );
};

export default ButtonHeader;
