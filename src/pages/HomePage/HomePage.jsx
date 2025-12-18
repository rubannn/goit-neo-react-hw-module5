import { useEffect, useState } from "react";

import { getTrendingMovies } from "@/api/themoviedb";
import MovieList from "@/components/MovieList/MovieList";

export default function HomePage() {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTrendingMovies();
        if (data) {
          setTrends(data.results);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetch();
  }, []);

  return trends.length && !error.length ? <MovieList movies={trends} /> : null;
}
