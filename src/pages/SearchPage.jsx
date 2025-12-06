import { useEffect, useState } from "react";
import { searchMovies, getMovieDetails } from "../api/omdb.js";
import Loader from "../components/Loader.jsx";
import MovieCard from "../components/MovieCard.jsx";

const OMDB_PAGE_SIZE = 10;
const LOGICAL_PAGE_SIZE = 20;

const FEATURED_IDS = [
  "tt4154796",
  "tt0848228",
  "tt4154756",
  "tt1375666",
  "tt0816692",
  "tt0468569",
  "tt0111161",
  "tt0133093"
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type] = useState("");
  const [year] = useState("");

  async function loadFeaturedMovies() {
    try {
      setLoading(true);
      setError("");

      const results = await Promise.all(
        FEATURED_IDS.map((id) => getMovieDetails(id))
      );

      const featured = results
        .filter(Boolean)
        .map((movie) => ({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
          Type: movie.Type
        }));

      setMovies(featured);
      setTotalResults(featured.length);
    } catch (err) {
      setError("Failed to load featured movies.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMovies(activeQuery = query, logicalPage = page) {
    try {
      setLoading(true);
      setError("");

      const firstOmdbPage = (logicalPage - 1) * 2 + 1;

      const res1 = await searchMovies(activeQuery, firstOmdbPage, type, year);
      let combinedMovies = res1.movies || [];
      const total = res1.totalResults || 0;
      let errorMsg = res1.error || "";

      const totalOmdbPages = Math.ceil(total / OMDB_PAGE_SIZE);
      const secondOmdbPage = firstOmdbPage + 1;

      if (secondOmdbPage <= totalOmdbPages) {
        const res2 = await searchMovies(
          activeQuery,
          secondOmdbPage,
          type,
          year
        );
        combinedMovies = combinedMovies.concat(res2.movies || []);
        if (!errorMsg && res2.error) errorMsg = res2.error;
      }

      setMovies(combinedMovies);
      setTotalResults(total);
      if (errorMsg) setError(errorMsg);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setPage(1);
      loadFeaturedMovies();
      return;
    }

    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchMovies(query, 1);
    }, 500);

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

  const totalPages =
    totalResults > 0 ? Math.ceil(totalResults / LOGICAL_PAGE_SIZE) : 0;

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

      {!loading && !error && !query.trim() && movies.length === 0 && (
        <p className="empty-text">Loading some top-rated picks for you...</p>
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
                Page {page} of {totalPages} · Showing {movies.length} of{" "}
                {totalResults}
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
