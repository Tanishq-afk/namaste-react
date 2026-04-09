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
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button className="btn" onClick={() => setMinRating(minRating >= 4.5 ? 0 : 4.5)}>
        Top Rated Restaurants
      </button>
      <button className="btn" onClick={() => setVegOnly(!vegOnly)}>
        Pure Veg Restaurants
      </button>
      <button className="btn" onClick={() => setCostRange(isCostFilterActive ? null : [0, 500])}>
        Cost Under ₹500
      </button>
    </div>
  );
};

export default SearchAndFilter;
