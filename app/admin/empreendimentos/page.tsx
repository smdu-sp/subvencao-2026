import { notFound } from "next/navigation";
import EmpreendimentosAdmin from "./client";

export default function Page() {
  if (process.env.ENVIRONMENT === "production") notFound();
  return <EmpreendimentosAdmin />;
}
