# 🎬 Movie Explorer – React JS UI

A futuristic and responsive **React.js** web app to explore movies, view detailed information, and save favourites — powered by the **OMDb API**.  
Built as part of a **UI Dev / React JS Internship Task**.

---

## 🌟 Live Demo

🔗 **Live Website**: _Coming Soon (Netlify/Vercel deployment)_  
📦 **Repository**: https://github.com/gautam1025/Movie_Explorer
🎥 Project Demo Video: [Watch on Google Drive](https://drive.google.com/file/d/1NV8B9ZoBY6nA5LM3ODPUl4YsMLbGliUX/view?usp=drive_link)

---

## 🚀 Features

🚀 Feature‑rich movie searching experience:

| Feature | Description |
|--------|-------------|
| 🔍 Smart Search | Search triggers on typing (debounce system) |
| 🎬 Featured Movies | When search is empty — shows high‑rated curated movies |
| 📄 Movie Details Page | Actors, Plot, Genre, Ratings, Runtime & more |
| ❤️ Favourites System | Add/remove to favourites with bouncing heart animation |
| 🔄 Pagination | ~20 movies per page using multiple OMDb pages |
| 💾 Persistent Data | Favourites stored in LocalStorage |
| 🧭 Routing | `/`, `/movie/:id`, `/favorites` |
| 🎥 Cinematic UI | Dark Sci‑Fi animated video background |
| ✨ UI Enhancements | Hover glow, scroll reveal animations, glass navbar |
| 📱 Responsive Design | Seamless Mobile → Desktop experience |

---

## 🛠 Tech Stack

| Technology | Role |
|-----------|------|
| React.js (Vite) | UI Architecture |
| React Router DOM | Page-based navigation |
| Context API | Global State Management |
| OMDb API | Movie Data Provider |
| CSS3 | Styling + Neon UI animations |

---

## 📸 Screenshots




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
```

## 🔑 Get your API key → https://www.omdbapi.com/
Then update .env:
VITE_OMDB_API_KEY=your_omdb_api_key_here

---

```
## 📁 Project Structure
src/
  api/
    omdb.js
  components/
    Loader.jsx
    MovieCard.jsx
    Navbar.jsx
    Footer.jsx
  context/
    FavoritesContext.jsx
  pages/
    SearchPage.jsx       # Debounced search + featured movies + pagination
    MovieDetailPage.jsx
    FavoritesPage.jsx
  App.jsx
  App.css                # Neon cyber UI + animations + video background
  main.jsx
```

## 👨‍💻 Author

Designed & Developed by Gautam Gupta © 2025
Frontend Developer — Passionate about interactive UIs

---

## ⭐ Special Notes

✔ Best viewed in dark mode
✔ Optimized for 1080p+ cinematic experience
✔ Continuously improving with feedback
