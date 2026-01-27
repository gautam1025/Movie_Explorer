import "./App.css";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="app-root">
      {/* Background video layer */}
      <div className="bg-video">
        <video autoPlay loop muted playsInline>
          <source src="/bg_video.mp4" type="video/mp4" />
        </video>
      </div>

      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}
