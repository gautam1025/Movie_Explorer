// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar() {
  const { favoritesCount } = useFavorites();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo-link">
          <div className="logo">
            <div className="logo-mark">🎬</div>
            <div className="logo-text">
              <span className="logo-title">Movie Explorer</span>
              <span className="logo-subtitle">Find your next favorite movie</span>
            </div>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            <div className="nav-pill">
              <span className="nav-icon">🔍</span>
              <span className="nav-label">Search</span>
            </div>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            <div className="nav-pill nav-pill-heart">
              <span className="nav-icon">❤️</span>
              <span className="nav-label">Favourites</span>
              <span className="nav-count">{favoritesCount}</span>
            </div>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
