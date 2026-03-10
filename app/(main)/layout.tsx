import GoBack from "@/components/GoBack";
import Article from "@/components/Article";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`text-black max-w-325 max-[1310px]:rounded-none rounded-sm mx-auto px-5 mt-5 pt-11 bg-white`}>
        <section className="flex flex-col max-w-4xl mx-auto w-full">
            <GoBack />
            {children}
            <Article />
        </section>
    </div>
  );
}
