import React, { useState, useEffect } from "react";
import PoemCard from "../components/PoemCard";
import { motion } from "framer-motion";
import PoemScroll from "@/components/PoemScroll";

// A longer sample poem to demonstrate scrolling features
const longPoem = {
  title: "The Raven",
  author: "Edgar Allan Poe",
  lines: [
    "Once upon a midnight dreary, while I pondered, weak and weary,",
    "Over many a quaint and curious volume of forgotten lore—",
    "While I nodded, nearly napping, suddenly there came a tapping,",
    "As of someone gently rapping, rapping at my chamber door.",
    "'Tis some visitor,' I muttered, 'tapping at my chamber door—",
    "Only this and nothing more.'",
    "",
    "Ah, distinctly I remember it was in the bleak December;",
    "And each separate dying ember wrought its ghost upon the floor.",
    "Eagerly I wished the morrow;—vainly I had sought to borrow",
    "From my books surcease of sorrow—sorrow for the lost Lenore—",
    "For the rare and radiant maiden whom the angels name Lenore—",
    "Nameless here for evermore.",
    "",
    "And the silken, sad, uncertain rustling of each purple curtain",
    "Thrilled me—filled me with fantastic terrors never felt before;",
    "So that now, to still the beating of my heart, I stood repeating",
    "'Tis some visitor entreating entrance at my chamber door—",
    "Some late visitor entreating entrance at my chamber door;—",
    "This it is and nothing more.'",
    "",
    "Presently my soul grew stronger; hesitating then no longer,",
    "'Sir,' said I, 'or Madam, truly your forgiveness I implore;",
    "But the fact is I was napping, and so gently you came rapping,",
    "And so faintly you came tapping, tapping at my chamber door,",
    "That I scarce was sure I heard you'—here I opened wide the door;—",
    "Darkness there and nothing more.",
    "",
    "Deep into that darkness peering, long I stood there wondering, fearing,",
    "Doubting, dreaming dreams no mortal ever dared to dream before;",
    "But the silence was unbroken, and the stillness gave no token,",
    "And the only word there spoken was the whispered word, 'Lenore?'",
    "This I whispered, an echo murmured back the word, 'Lenore!'—",
    "Merely this and nothing more.",
  ],
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
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
          {/* <PoemCard poem={longPoem} /> */}
        </div>
      )}
    </div>
  );
};

export default Index;
