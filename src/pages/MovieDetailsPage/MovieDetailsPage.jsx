import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";


import { getMovieDetails, getImagePath } from "@/api/themoviedb";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state ?? "/";
  const releaseYear = movie?.release_date.split("-")[0];
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMovieDetails(movieId);
        if (data) {
          setMovie(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetch();
  }, [movieId]);
  return (
    movie &&
    !error.length && (
      <>
        <Link to={backLinkHref} className={styles.backLink}>
          Go back
        </Link>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            {movie && (
              <img
                src={getImagePath(movie.poster_path, 300)}
                alt={`${movie.original_title} image`}
              />
            )}
          </div>
          <div>
            <h1>
              {movie.original_title} ({releaseYear})
            </h1>
            <p>User score: {(movie.vote_average * 10).toFixed(0)}%</p>

            <section className="section">
              <h4>Overview</h4>
              <p> {movie.overview}</p>
            </section>
            <section className="section">
              <h4>Genres</h4>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <hr />
        <h4>Additional information</h4>
        <div className={styles.infoLinks}>
          <NavLink
            to="cast"
            state={location.state}
            className={({ isActive }) =>
              isActive ? `${styles.infoLink} ${styles.active}` : styles.infoLink
            }
          >
            Cast
          </NavLink>

          <NavLink
            to="reviews"
            state={location.state}
            className={({ isActive }) =>
              isActive ? `${styles.infoLink} ${styles.active}` : styles.infoLink
            }
          >
            Reviews
          </NavLink>
        </div>
        <hr />
        <Outlet />
      </>
    )
  );
}
