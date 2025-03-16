import HelloWorld from "@/components/HelloWorld";
import Poem from "@/components/Poem";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black">
      <h1 className="text-3xl font-bold text-white pt-4 sm:pt-6">Poe.try</h1>

      <main className="w-full flex-1">
        <Poem />
      </main>

      {/* <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-stone-800 text-stone-50 px-4 py-2 rounded-full shadow-lg">
        <p className="text-sm">Created by Vangmay Sachan</p>
      </footer> */}
    </div>
  );
}
