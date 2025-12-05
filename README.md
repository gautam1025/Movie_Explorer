# 🎬 Movie Explorer – React JS UI

A responsive React.js web app to search movies using the OMDb API, view detailed information, and manage favourite movies.  
Built as part of a **UI Dev / React JS Internship Task**.

---

## 🌟 Live Demo

🔗 **Live Website**: _Coming Soon (Netlify/Vercel deployment)_  
📦 **Repository**: https://github.com/gautam1025/Movie_Explorer

---

## 🚀 Features

- 🔎 **Movie Search**
  - Fetch movies by title from OMDb API
  - Responsive movie card layout with posters

- 📄 **Movie Details Page**
  - More info: year, runtime, genre, actors, plot, IMDb rating
  - Smooth navigation via React Router

- ⭐ **Favourites System**
  - Add/remove movies using a star toggle button
  - Data persisted in **localStorage**
  - Global state handled with **React Context**
  - Dedicated `/favorites` page to manage saved movies

- 🧭 **Routing**
  | Route | Purpose |
  |-------|---------|
  | `/` | Search movies |
  | `/movie/:id` | Movie details |
  | `/favorites` | View saved favourites |

- ⏳ **User Feedback**
  - Loading spinner while fetching
  - Friendly error messages when API fails

- ✨ **Modern UI**
  - Mobile‑first design
  - Animated glowing background using CSS keyframes
  - Card hover + staggered fade‑in animation
  - Sticky glassmorphic navbar

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React.js (Vite) | Frontend Framework |
| React Router DOM | Client-side routing |
| Context API | Global state (Favourites) |
| OMDb API | Movie database |
| CSS | UI + animations |

---

## 📸 Screenshots

<img width="1884" height="865" alt="Screenshot 2025-12-06 000538" src="https://github.com/user-attachments/assets/a7f00b73-98de-4974-b1a2-d716d7fd566d" />
<img width="1902" height="876" alt="Screenshot 2025-12-06 000517" src="https://github.com/user-attachments/assets/60f6d8ab-b2b6-415a-9103-ff149a496c02" />
<img width="1901" height="878" alt="image" src="https://github.com/user-attachments/assets/22f62b3b-aa12-4150-9f16-877d91f2d8a0" />



---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/gautam1025/Movie_Explorer.git
cd Movie_Explorer

# 2️⃣ Install dependencies
npm install

# 3️⃣ Add environment variables
echo "VITE_OMDB_API_KEY=your_omdb_api_key_here" > .env

# 4️⃣ Start the development server
npm run dev


🔑 Get a free OMDb API key from: https://www.omdbapi.com/
Then update .env:
VITE_OMDB_API_KEY=your_omdb_api_key_here


📁 Project Structure

src/
  api/
    omdb.js              # OMDb API functions
  components/
    Loader.jsx           # Loading indicator
    MovieCard.jsx        # Card UI + favourites toggle
    Navbar.jsx           # Glassmorphic navigation with badge
  context/
    FavoritesContext.jsx # Context + localStorage sync
  pages/
    SearchPage.jsx       # Search + pagination
    MovieDetailPage.jsx  # Detail info per movie
    FavoritesPage.jsx    # List of saved movies
  App.jsx                # Routes + layout
  App.css                # Styling & animations
  main.jsx               # App entry point
