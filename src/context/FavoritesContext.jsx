
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

const STORAGE_KEY = "movie_favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites", err);
    }
  }, [favorites]);

  const isFavorite = (id) =>
    favorites.some((movie) => movie.imdbID === id);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.imdbID === movie.imdbID);
      if (exists) {
        return prev.filter((m) => m.imdbID !== movie.imdbID);
      }

      const { imdbID, Title, Year, Poster, Type } = movie;
      return [...prev, { imdbID, Title, Year, Poster, Type }];
    });
  };

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
