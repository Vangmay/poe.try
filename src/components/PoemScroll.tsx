import { useEffect, useState, useCallback, useRef } from "react";
import { fetchNRandomPoems } from "../services/poem";
import PoemCard from "./PoemCard";
interface Poem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

const PoemScroll = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setCurrentIndex] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const poemRefs = useRef<Array<HTMLDivElement | null> | null>([]);

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
    <div className="relative h-screen w-full">
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
          <div className="h-screen w-full flex items-center justify-center">
            <ul>
              <p className="mt-4 text-stone-500 text-sm">
                Spinning wheel of thoughts,
              </p>
              <br />
              <p className="mt-4 text-stone-500 text-sm">
                words wait in the silent void,
              </p>
              <br />

              <p className="mt-4 text-stone-500 text-sm">
                verse arrives at last.
              </p>
            </ul>
          </div>
        )}
        {error && (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemScroll;
