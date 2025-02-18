"use client";

import { useEffect, useState } from "react";
import PoemCard from "./PoemCard";

const Poem = () => {
  const [poems, setPoems] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState("");

  const fetchData = async () => {
    try {
      const authorUrl = "https://poetrydb.org/authors";
      const baseUrl = "https://poetrydb.org/authors/";
      console.log("Sending req");
      const response = await fetch(authorUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setAuthors(data.authors);
      setCurrentAuthor(
        data.authors[Math.floor(Math.random() * data.authors.length)]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    authors.map(async (authorName) => {
      const poem_data = await fetch(
        `https://poetrydb.org/author/${authorName}`
      );
      const poem_details = await poem_data.json();
      setPoems(poems.concat(poem_details));
    });
  }, [authors]);

  return (
    <div className="relative h-screen w-full">
      <button
        // onClick={fetchRandomAuthor}
        // disabled={refreshing}
        className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-stone-800 text-stone-50 px-4 py-2 rounded-full shadow-lg hover:bg-stone-700 transition-colors duration-300"
      >
        <span>Get Another Poet</span>
        {/* <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> */}
      </button>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide no-scrollbar">
        {poems
          .filter((poem) => poem.linecount <= 50)
          .map((poem, index) => (
            <div
              key={`${poem.title}-${index}`}
              className="h-screen w-full flex items-center justify-center snap-start snap-always p-4 no-scrollbar"
            >
              <PoemCard poem={poem} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Poem;
