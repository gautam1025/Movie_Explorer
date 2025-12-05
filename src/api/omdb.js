
const API_BASE = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


export async function searchMovies(query, page = 1) {
  if (!query) return { movies: [], totalResults: 0 };

  const url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") {
    return { movies: [], totalResults: 0, error: data.Error };
  }

  return {
    movies: data.Search,
    totalResults: Number(data.totalResults || 0),
    error: null,
  };
}

export async function getMovieDetails(imdbID) {
  const url = `${API_BASE}?apikey=${API_KEY}&i=${imdbID}&plot=full`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie details");
  }

  return data;
}
