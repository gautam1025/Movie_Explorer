import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader.jsx";

// Lazy load pages for better performance
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage.jsx"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage.jsx"));

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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

    </div>
  );
}
