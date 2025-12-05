// src/pages/FavoritesPage.jsx
import { useFavorites } from "../context/FavoritesContext.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const hasFavorites = favorites && favorites.length > 0;

  return (
    <section>
      <h2 className="page-title">Your Favourites</h2>

      {!hasFavorites && (
        <p className="empty-text">
          You haven&apos;t added any favourites yet. Go to the Search page and
          tap the ⭐ on a movie.
        </p>
      )}

      {hasFavorites && (
        <div className="movies-grid">
          {favorites.map((movie, index) => (
            <MovieCard key={`${movie.imdbID}-fav-${index}`} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
