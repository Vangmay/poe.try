// @ts-nocheck
import { useEffect, useState, useCallback, useRef } from "react";
import PoemCard from "./PoemCard";
interface Poem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

const authorUrl = "https://poetrydb.org/author";
const authorList = [
  "Adam Lindsay Gordon",
  "Alan Seeger",
  "Alexander Pope",
  "Algernon Charles Swinburne",
  "Ambrose Bierce",
  "Amy Levy",
  "Andrew Marvell",
  "Ann Taylor",
  "Anne Bradstreet",
  "Anne Bronte",
  "Anne Killigrew",
  "Anne Kingsmill Finch",
  "Annie Louisa Walker",
  "Arthur Hugh Clough",
  "Ben Jonson",
  "Charles Kingsley",
  "Charles Sorley",
  "Charlotte Bronte",
  "Charlotte Smith",
  "Christina Rossetti",
  "Christopher Marlowe",
  "Christopher Smart",
  "Coventry Patmore",
  "Edgar Allan Poe",
  "Edmund Spenser",
  "Edward Fitzgerald",
  "Edward Lear",
  "Edward Taylor",
  "Edward Thomas",
  "Eliza Cook",
  "Elizabeth Barrett Browning",
  "Emily Bronte",
  "Emily Dickinson",
  "Emma Lazarus",
  "Ernest Dowson",
  "Eugene Field",
  "Francis Thompson",
  "Geoffrey Chaucer",
  "George Eliot",
  "George Gordon, Lord Byron",
  "George Herbert",
  "George Meredith",
  "Gerard Manley Hopkins",
  "Helen Hunt Jackson",
  "Henry David Thoreau",
  "Henry Vaughan",
  "Henry Wadsworth Longfellow",
  "Hugh Henry Brackenridge",
  "Isaac Watts",
  "James Henry Leigh Hunt",
  "James Thomson",
  "James Whitcomb Riley",
  "Jane Austen",
  "Jane Taylor",
  "John Clare",
  "John Donne",
  "John Dryden",
  "John Greenleaf Whittier",
  "John Keats",
  "John McCrae",
  "John Milton",
  "John Trumbull",
  "John Wilmot",
  "Jonathan Swift",
  "Joseph Warton",
  "Joyce Kilmer",
  "Julia Ward Howe",
  "Jupiter Hammon",
  "Katherine Philips",
  "Lady Mary Chudleigh",
  "Lewis Carroll",
  "Lord Alfred Tennyson",
  "Louisa May Alcott",
  "Major Henry Livingston, Jr.",
  "Mark Twain",
  "Mary Elizabeth Coleridge",
  "Matthew Arnold",
  "Matthew Prior",
  "Michael Drayton",
  "Oliver Goldsmith",
  "Oliver Wendell Holmes",
  "Oscar Wilde",
  "Paul Laurence Dunbar",
  "Percy Bysshe Shelley",
  "Philip Freneau",
  "Phillis Wheatley",
  "Ralph Waldo Emerson",
  "Richard Crashaw",
  "Richard Lovelace",
  "Robert Browning",
  "Robert Burns",
  "Robert Herrick",
  "Robert Louis Stevenson",
  "Robert Southey",
  "Robinson",
  "Rupert Brooke",
  "Samuel Coleridge",
  "Samuel Johnson",
  "Sarah Flower Adams",
  "Sidney Lanier",
  "Sir John Suckling",
  "Sir Philip Sidney",
  "Sir Thomas Wyatt",
  "Sir Walter Raleigh",
  "Sir Walter Scott",
  "Stephen Crane",
  "Thomas Campbell",
  "Thomas Chatterton",
  "Thomas Flatman",
  "Thomas Gray",
  "Thomas Hood",
  "Thomas Moore",
  "Thomas Warton",
  "Walt Whitman",
  "Walter Savage Landor",
  "Wilfred Owen",
  "William Allingham",
  "William Barnes",
  "William Blake",
  "William Browne",
  "William Cowper",
  "William Cullen Bryant",
  "William Ernest Henley",
  "William Lisle Bowles",
  "William Morris",
  "William Shakespeare",
  "William Topaz McGonagall",
  "William Vaughn Moody",
  "William Wordsworth",
];

function getRandomSubarray(arr: any, size: any) {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

export const fetchNRandomPoems = async (n: Number) => {
  const randomAuthors = getRandomSubarray(authorList, n);

  const poemPromises = randomAuthors.map(async (name: any) => {
    const url = authorUrl + "/" + name;
    const response = await fetch(url);
    const authorPoems = await response.json();

    const randomPoem =
      authorPoems[Math.floor(Math.random() * authorPoems.length)];
    return randomPoem;
  });

  const poemList = await Promise.all(poemPromises);
  return poemList;
};

export const getRandomPoems = async () => {
  try {
    const ans = await fetchNRandomPoems(10);
    console.log(ans);
  } catch (error) {
    console.error("Error fetching poems:", error);
  }
};

const PoemScroll = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setCurrentIndex] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const poemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const fetchMorePoems = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("fetching more poems");

    try {
      const newPoems = await fetchNRandomPoems(10);
      setPoems((prevPoems) => [...prevPoems, ...newPoems]);
    } catch (err) {
      console.error("Error fetching poems:", err);
      setError("Failed to load poems. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMorePoems();

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = poemRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setCurrentIndex(index);

            if ((index + 1) % 5 === 0 && index >= poems.length - 5) {
              fetchMorePoems();
            }
          }
        }
      });
    };

    observer.current = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMorePoems]);

  useEffect(() => {
    poemRefs.current = poemRefs.current.slice(0, poems.length);

    poemRefs.current.forEach((ref) => {
      if (ref && observer.current) {
        observer.current.observe(ref);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [poems]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center">
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide no-scrollbar">
        {poems.map((poem, index) => (
          <div
            key={`${poem.title}-${index}`}
            ref={(el) => (poemRefs.current[index] = el)}
            className="h-screen w-full flex items-center justify-center snap-start snap-always p-4 no-scrollbar"
          >
            <PoemCard poem={poem} />
          </div>
        ))}
        {loading && (
          <div className="h-screen w-full flex flex-col items-center justify-center text-center p-4">
            <p className="text-stone-500 text-lg font-semibold">
              Loading poems...
            </p>
            <ul className="mt-4 text-stone-400 text-sm">
              <li>Spinning wheel of thoughts,</li>
              <li>Words wait in the silent void,</li>
              <li>Verse arrives at last.</li>
            </ul>
          </div>
        )}
        {error && (
          <div className="h-screen w-full flex items-center justify-center">
            <p className="text-xl text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemScroll;
