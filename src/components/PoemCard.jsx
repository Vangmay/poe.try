import React, { useState } from "react";
import { Star } from "lucide-react";

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
        <span>"Favourite"</span>
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
  //   const poem = {
  //     title: "The Hope Of My Heart",
  //     author: "John McCrae",
  //     lines: [
  //       '"Delicta juventutis et ignorantius ejus, quoesumus ne memineris, Domine."',
  //       "",
  //       "",
  //       "",
  //       "I left, to earth, a little maiden fair,",
  //       "With locks of gold, and eyes that shamed the light;",
  //       "I prayed that God might have her in His care",
  //       "And sight.",
  //       "",
  //       "Earth's love was false; her voice, a siren's song;",
  //       "(Sweet mother-earth was but a lying name)",
  //       "The path she showed was but the path of wrong",
  //       "And shame.",
  //       "",
  //       '"Cast her not out!" I cry. God\'s kind words come --',
  //       '"Her future is with Me, as was her past;',
  //       "It shall be My good will to bring her home",
  //       'At last."',
  //     ],
  //     linecount: "13",
  //   };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-stone-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-serif text-stone-800 text-center mb-2">
        {poem.title}
      </h1>
      <p className="text-sm italic text-stone-600 text-center mb-8">
        by {poem.author}
      </p>

      <div className="space-y-6 text-center">
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
                  className="font-serif text-stone-800 leading-relaxed"
                >
                  {line || "\u00A0"}{" "}
                  {/* Use non-breaking space for empty lines */}
                </p>
              ))}
            </div>
          ))}
      </div>
      <br />
      <FavouriteButton />
    </div>
  );
};

export default PoemCard;
