import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  // For scroll fade‑in
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // For 3D tilt effect
  const [tiltStyle, setTiltStyle] = useState({});

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -10; // Max 10 degrees
    const rotateY = (x - centerX) / centerX * 10; // Max 10 degrees
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.04)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
  };

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div
      ref={cardRef}
      className={`movie-card ${visible ? "card-visible" : "card-hidden"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
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
            <img src={movie.Poster} alt={movie.Title} />
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
}
