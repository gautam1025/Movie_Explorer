
import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar() {
  const { favoritesCount } = useFavorites();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 className="logo">
            <span>🎬</span>
            <span>Movie Explorer</span>
          </h1>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontSize: "0.9rem",
              textDecoration: "none",
              color: isActive ? "#e5e7eb" : "#9ca3af",
            })}
          >
            Search
          </NavLink>

          <NavLink
            to="/favorites"
            style={({ isActive }) => ({
              fontSize: "0.9rem",
              textDecoration: "none",
              color: isActive ? "#e5e7eb" : "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            })}
          >
            <span>Favourites</span>
            <span
              style={{
                minWidth: "1.6rem",
                height: "1.6rem",
                borderRadius: "999px",
                border: "1px solid #4b5563",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                background: "rgba(15, 23, 42, 0.9)",
              }}
            >
              ⭐ {favoritesCount}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
