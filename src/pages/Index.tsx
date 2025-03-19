import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PoemScroll from "@/components/PoemScroll";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full bg-stone-50/80 backdrop-blur-sm z-40 py-4 px-6 shadow-sm">
        <h1 className="text-center font-serif text-3xl md:text-4xl text-stone-800">
          Poe.try
          <span className="block text-sm md:text-base font-sans text-stone-500 mt-1">
            Because doomscrolling is better when it expands your mind
          </span>
        </h1>
      </header>
      <div className="min-h-screen min-w-screen flex items-center justify-center p-4 py-16">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 rounded-full border-t-2 border-stone-300 animate-spin"></div>
            </div>
            <p className="mt-4 text-stone-500 text-sm">Loading poem...</p>
          </motion.div>
        ) : (
          <div className="items-center justify-center min-h-screen min-w-screen">
            <PoemScroll />
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
