"use client";

import { useEffect, useState } from "react";
import PoemCard from "./PoemCard";

const Poem = () => {
  const [poems, setPoems] = useState([]);
  const [authors, setAuthors] = useState([]);

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
      //   console.log("data.authors");
      //   console.log(data.authors);
      //   console.log("authors");
      //   console.log(authors);

      const poem_data = await fetch(
        "https://poetrydb.org/author/" + `${data.authors[0]}`
      );
      const poem_details = await poem_data.json();
      setPoems(poem_details);
      console.log(poem_details);
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
    <div className="h-full snap-y snap-mandatory overflow-y-auto">
      {poems.map((poem) => {
        return (
          <div>
            <br />
            <PoemCard poem={poem} />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Poem;
