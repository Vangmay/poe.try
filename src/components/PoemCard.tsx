import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PoemProps {
  poem: {
    title: string;
    author: string;
    lines: string[];
  };
}

const PoemCard: React.FC<PoemProps> = ({ poem }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const progress = scrollTop / scrollHeight;
    setScrollProgress(scrollTop === 0 ? 0 : progress);
    setShowBackToTop(scrollTop > 100);
  };

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stanzas = poem.lines.reduce((stanzas, line, index) => {
    if (line === "" && poem.lines[index - 1] !== "") {
      stanzas.push([]);
    } else if (line !== "") {
      if (stanzas.length === 0) stanzas.push([]);
      stanzas[stanzas.length - 1].push(line);
    }
    return stanzas;
  }, [] as string[][]);

  return (
    <div className="w-full flex justify-center items-center px-4 py-8 md:py-12 lg:py-16">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-full rounded-2xl shadow-lg overflow-hidden backdrop-blur-md bg-white/90 border border-stone-200 relative"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-amber-100 z-10"
                style={{
                  width: `${scrollProgress * 100}%`,
                  opacity: scrollProgress > 0 ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="sticky top-0 z-10 p-4 sm:p-6 lg:p-8 pb-3 sm:pb-4 bg-white/95 backdrop-blur-md border-b border-stone-200"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-serif text-stone-800 mb-2 tracking-tight">
                  {poem.title}
                </p>
                <p className="text-sm sm:text-base text-stone-600">
                  by <span className="italic">{poem.author}</span>
                </p>
              </motion.div>

              <div
                ref={contentRef}
                className="p-4 sm:p-6 lg:p-8 pt-2 max-h-[50vh] sm:max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent"
                onScroll={handleScroll}
              >
                <div className="space-y-6 my-6 md:my-8">
                  {stanzas.map((stanza, stanzaIndex) => (
                    <motion.div
                      key={stanzaIndex}
                      className="stanza"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + stanzaIndex * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      {stanza.map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="font-serif text-sm sm:text-base md:text-lg text-stone-700 leading-relaxed text-center"
                        >
                          {line || "\u00A0"}
                        </p>
                      ))}
                    </motion.div>
                  ))}
                </div>
                <div className="h-10 sm:h-16"></div>
              </div>

              <AnimatePresence>
                {showBackToTop && (
                  <motion.button
                    className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-2 sm:p-3 rounded-full bg-white/90 shadow-md text-stone-600 hover:bg-stone-100 hover:text-stone-800 backdrop-blur-sm border border-stone-200 z-20 transition-colors duration-300"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PoemCard;
