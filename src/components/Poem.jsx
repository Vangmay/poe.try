"use client";

import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Poets</h1>
      <ul>
        {authors.map((author, index) => (
          <li key={index}>{author}</li>
        ))}
      </ul>
      {/* <ul>
        {poems.map((author, index) => (
          <li key={index}>{author}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Poem;
