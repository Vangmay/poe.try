import React, { useState } from "react";
import { Star } from "lucide-react";
import "../app/globals.css";

const FavouriteButton = () => {
  const [favorited, setFavorited] = useState(false);
  return (
    <center>
      <button
        onClick={() => setFavorited(!favorited)}
        className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors duration-300 ${
          favorited
            ? "bg-amber-50 text-amber-700 border border-amber-200"
            : "text-stone-600 border border-stone-200 hover:bg-stone-100"
        }`}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <span>Favourite</span>
        <Star
          className={`h-4 w-4 ${
            favorited ? "fill-amber-400 text-amber-400" : "text-stone-600"
          }`}
        />
      </button>
    </center>
  );
};

const PoemCard = ({ poem }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
      <div className="w-full p-6 backdrop-blur-sm rounded-xl shadow-lg overflow-y-auto max-h-[80vh] scrollbar-hide">
        <div className="top-0 backdrop-blur-sm pt-2 pb-4">
          <h1 className="text-2xl font-serif text-stone-400 text-center mb-2">
            {poem.title}
          </h1>
          <p className="text-sm italic text-stone-600 text-center">
            by {poem.author}
          </p>
        </div>

        <div className="space-y-6 text-center overflow-y-none pb-4 no-scrollbar">
          {poem.lines
            .reduce((stanzas, line, index) => {
              if (line === "" && poem.lines[index - 1] !== "") {
                stanzas.push([]);
              } else if (line !== "") {
                if (stanzas.length === 0) stanzas.push([]);
                stanzas[stanzas.length - 1].push(line);
              }
              return stanzas;
            }, [])
            .map((stanza, stanzaIndex) => (
              <div key={stanzaIndex} className="stanza">
                {stanza.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className="font-serif text-stone-400 leading-relaxed text-base sm:text-lg"
                  >
                    {line || "\u00A0"}
                  </p>
                ))}
              </div>
            ))}
        </div>

        <div className="bottom-0 pt-4 backdrop-blur-sm">
          <FavouriteButton />
        </div>
      </div>
    </div>
  );
};

export default PoemCard;
