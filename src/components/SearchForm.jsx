import { memo } from "react";

const SearchForm = memo(function SearchForm({ query, onQueryChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-input"
        type="text"
        value={query}
        placeholder="Search movie title..."
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
});

SearchForm.displayName = 'SearchForm';

export default SearchForm;
