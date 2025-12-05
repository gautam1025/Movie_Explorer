import "./App.css";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage.jsx";
import MovieDetailPage from "./Pages/MovieDetailPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  );
}

// 