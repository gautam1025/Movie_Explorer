# 🎬 Movie Explorer – React JS UI

A responsive React.js web app to search movies using the OMDb API, view detailed information, and manage favourite movies. Built as part of a UI Dev / React JS internship task.

---

## 🚀 Features

- 🔎 **Movie Search**
  - Search by movie title using the OMDb API.
  - Results displayed as responsive cards with poster, title, and year.

- 📄 **Movie Details Page**
  - Route: `/movie/:id`
  - Shows title, year, runtime, rating, genre, actors, plot, poster, and IMDb rating.

- 🧭 **Routing**
  - `/` – Search page
  - `/movie/:id` – Movie details page
  - `/favorites` – List of favourite movies

- ⭐ **Favourites System**
  - Add / remove movies from favourites using a star button.
  - Favourites are stored in **localStorage**.
  - Global favourites count shown in navbar via **React Context**.
  - Dedicated **Favourites** page to view all saved movies.

- ⏳ **Loading & Error States**
  - Central `Loader` component with a spinner.
  - User‑friendly error messages when API calls fail.

- 📱 **Responsive & Polished UI**
  - Mobile‑first layout with CSS grid for cards.
  - Sticky, glass‑effect navbar.
  - Animated glowing background using CSS keyframes.
  - Card hover and fade‑in animations for more engaging UX.

---

## 🛠 Tech Stack

- **React.js** (Vite)
- **React Router DOM**
- **Context API** for global favourites state
- **OMDb API** for movie data
- Plain **CSS** for styling and animations

---

⚙️ Setup & Installation

    # 1. Clone the repository
        git clone https://github.com/gautam1025/Movie_Explorer.git
        cd Movie_Explorer

    # 2. Install dependencies
        npm install

    # 3. Create environment file
        echo "VITE_OMDB_API_KEY=your_omdb_api_key_here" > .env

    # 4. Start the dev server
        npm run dev

Obtain a free OMDb API key from their website and put it in .env:
    VITE_OMDB_API_KEY=your_omdb_api_key_here


## 📁 Project Structure

```text
src/
  api/
    omdb.js              # OMDb API functions (search + details)
  components/
    Loader.jsx           # Reusable loading spinner
    MovieCard.jsx        # Movie card UI with favourite toggle
    Navbar.jsx           # Top navigation with favourites badge
  context/
    FavoritesContext.jsx # Context + localStorage for favourites
  pages/
    SearchPage.jsx       # Home page: search + results + pagination
    MovieDetailPage.jsx  # Detailed view for a single movie
    FavoritesPage.jsx    # Grid of favourited movies
  App.jsx                # Routes + main layout
  App.css                # Global styles & animations
  main.jsx               # App entry point (ReactDOM + Router + Provider)


