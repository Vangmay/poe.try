import HelloWorld from "@/components/HelloWorld";
import Poem from "@/components/Poem";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Poe.try
      </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Poem />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-stone-800 text-stone-50 px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm">Created by Vangmay Sachan</p>
        </div>
      </footer>
    </div>
  );
}
