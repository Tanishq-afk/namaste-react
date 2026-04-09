const SearchAndFilter = ({
  searchText,
  setSearchText,
  minRating,
  setMinRating,
  vegOnly,
  setVegOnly,
  costRange,
  setCostRange,
}) => {
  const isCostFilterActive = Array.isArray(costRange);

  return (
    <div className="filter">
      <input
        type="text"
        className="search-box"
        placeholder="Search restaurants or cuisines"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button
        className={`btn ${minRating >= 4.5 ? "btn-active" : "btn-secondary"}`}
        type="button"
        onClick={() => setMinRating(minRating >= 4.5 ? 0 : 4.5)}
      >
        Top Rated Restaurants
      </button>
      <button
        className={`btn ${vegOnly ? "btn-active" : "btn-secondary"}`}
        type="button"
        onClick={() => setVegOnly(!vegOnly)}
      >
        Pure Veg Restaurants
      </button>
      <button
        className={`btn ${isCostFilterActive ? "btn-active" : "btn-secondary"}`}
        type="button"
        onClick={() => setCostRange(isCostFilterActive ? null : [0, 500])}
      >
        Cost Under ₹500
      </button>
    </div>
  );
};

export default SearchAndFilter;
