import { useEffect, useState } from "react";
import { searchMovies } from "../api/omdb.js";
import Loader from "../components/Loader.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function SearchPage() {
  const [query, setQuery] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMovies(activePage = page) {
    try {
      setLoading(true);
      setError("");

      const res = await searchMovies(query, activePage);

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
    fetchMovies(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(1);
  };

  const totalPages = Math.ceil(totalResults / 10);
  const goToPage = (newPage) => {
    setPage(newPage);
    fetchMovies(newPage);
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

      {!loading && !error && movies.length === 0 && (
        <p className="empty-text">No movies found.</p>
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
