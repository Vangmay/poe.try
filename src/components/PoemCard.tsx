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
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="relative w-full max-w-3xl mx-auto min-h-[50vh] flex flex-col justify-center px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-full rounded-2xl shadow-lg overflow-hidden backdrop-blur-md bg-white/70 border border-stone-200 relative"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 z-10"
                style={{
                  width: `${scrollProgress * 100}%`,
                  opacity: scrollProgress > 0 ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div className="sticky top-0 z-10 p-6 pb-4 bg-white/90 backdrop-blur-md border-b border-stone-200">
                <h1 className="text-2xl sm:text-3xl font-serif text-stone-800 mb-2 tracking-tight">
                  {poem.title}
                </h1>
                <p className="text-sm sm:text-base text-stone-600">
                  by <span className="italic">{poem.author}</span>
                </p>
              </motion.div>

              <div
                ref={contentRef}
                className="p-6 pt-0 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto"
                onScroll={handleScroll}
              >
                <div className="space-y-6 my-8">
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
                          className="font-serif text-stone-700 leading-relaxed text-base sm:text-lg text-center"
                        >
                          {line || "\u00A0"}
                        </p>
                      ))}
                    </motion.div>
                  ))}
                </div>
                <div className="h-16"></div>
              </div>

              <AnimatePresence>
                {showBackToTop && (
                  <motion.button
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-white/80 shadow-md text-stone-600 hover:bg-stone-100 hover:text-stone-800 backdrop-blur-sm border border-stone-200 z-20"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowUp className="h-5 w-5" />
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
