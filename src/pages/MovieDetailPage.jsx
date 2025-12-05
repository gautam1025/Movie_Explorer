import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/omdb.js";
import Loader from "../components/Loader.jsx";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Failed to load movie");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <section className="detail-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p className="error-text" style={{ marginTop: "1rem" }}>
          {error}
        </p>
      </section>
    );
  }

  if (!movie) return null;

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <section className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">
        <div className="detail-poster">
          {hasPoster ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="poster-placeholder">No Image</div>
          )}
        </div>

        <div className="detail-info">
          <div className="detail-header">
            <h2 className="detail-title">{movie.Title}</h2>
          </div>

          <p className="detail-meta">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>

          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <p>
              <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating} / 10
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
