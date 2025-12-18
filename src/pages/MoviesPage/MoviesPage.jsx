import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "@/api/themoviedb";
import MovieList from "@/components/MovieList/MovieList";

import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setIsLoading(true);
      searchMovies(query)
        .then((data) => setMovies(data.results))
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    } else {
      setMovies([]);
    }
  }, [searchParams]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;

    if (!query.length) return;

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("query", query);
    setSearchParams(updatedParams);
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {movies.length && !error.length && !isLoading ? (
        <MovieList movies={movies} />
      ) : null}
    </div>
  );
}
