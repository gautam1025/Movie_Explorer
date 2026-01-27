import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useTilt } from "../hooks/useTilt.js";

const MovieCard = memo(function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  // For scroll fade-in
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Optimized 3D tilt effect using custom hook
  const { tiltRef, handleMouseMove, handleMouseLeave } = useTilt();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleFavClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  }, [movie, toggleFavorite]);

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        tiltRef.current = el;
      }}
      className={`movie-card ${visible ? "card-visible" : "card-hidden"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`fav-btn ${fav ? "fav-btn-active" : ""}`}
        onClick={handleFavClick}
        aria-label={fav ? "Remove from favourites" : "Add to favourites"}
      >
        {fav ? "❤️" : "🤍"}
      </button>

      <Link to={`/movie/${movie.imdbID}`} className="movie-link">
        <div className="poster-wrapper">
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              loading="lazy" // Lazy load images for better performance
            />
          ) : (
            <div className="poster-placeholder">No Image</div>
          )}
        </div>

        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
