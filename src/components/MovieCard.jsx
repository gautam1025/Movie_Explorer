import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="movie-card">
      <button
        className={`fav-chip ${fav ? "fav-chip-active" : ""}`}
        onClick={handleFavClick}
        aria-label={fav ? "Remove from favourites" : "Add to favourites"}
      >
        ⭐
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
