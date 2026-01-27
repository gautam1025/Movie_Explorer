# Optimization Tasks for Movie Explorer App

## 1. Create Optimized Tilt Hook
- [ ] Create `src/hooks/useTilt.js` with GPU-accelerated tilt using requestAnimationFrame and CSS transforms (no React state).

## 2. Optimize MovieCard Component
- [ ] Update `src/components/MovieCard.jsx` to use the new useTilt hook.
- [ ] Memoize MovieCard with React.memo.
- [ ] Use useCallback for event handlers.
- [ ] Add loading="lazy" to poster images.

## 3. Split SearchPage Component
- [ ] Create `src/components/SearchForm.jsx` component.
- [ ] Update `src/pages/SearchPage.jsx` to use SearchForm and optimize with useCallback for fetchMovies.

## 4. Add Lazy Loading for Pages
- [ ] Update `src/App.jsx` to use React.lazy for page components.

## 5. Improve Folder Structure
- [ ] Ensure hooks folder exists (created with useTilt.js).

## 6. Final Optimizations
- [ ] Verify no inline functions in JSX.
- [ ] Ensure production readiness (check package.json, vite.config.js).
- [ ] Test for 60fps animations and no layout shifts.
