import { useEffect, useState } from "react";
import { searchMovies } from "../api/omdb.js";
import Loader from "../components/Loader.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function SearchPage() {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reusable fetch function
  async function fetchMovies(activeQuery = query, activePage = page) {
    try {
      setLoading(true);
      setError("");

      const res = await searchMovies(activeQuery, activePage);

      setMovies(res.movies);
      setTotalResults(res.totalResults);

      if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(query, 1);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError("");
      return;
    }

    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchMovies(query, 1);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) return;
    if (page === 1) return;
    fetchMovies(query, page);
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const totalPages = Math.ceil(totalResults / 10);
  const goToPage = (newPage) => {
    setPage(newPage);
  };

  return (
    <section>
      <h2 className="page-title">Search Movies</h2>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={query}
          placeholder="Search movie title..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      {loading && <Loader />}

      {error && !loading && <p className="error-text">{error}</p>}

      {!loading && !error && movies.length === 0 && query.trim() && (
        <p className="empty-text">No movies found.</p>
      )}

      {!loading && !error && !query.trim() && (
        <p className="empty-text">Start typing to search for a movie.</p>
      )}

      {!loading && movies.length > 0 && (
        <>
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-secondary"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                ← Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
