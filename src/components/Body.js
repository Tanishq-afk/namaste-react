import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { slugifyRestaurantName } from "../utils/restaurantName";
import useRestaurants from "../utils/useRestaurants";
import useRestaurantFilters from "../utils/useRestaurantFilters";
import SearchAndFilter from "./SearchAndFilter";
import useDebounce from "../utils/useDebounce";

const Body = () => {
  const { listOfRestaurants, isLoading } = useRestaurants();
  const [searchText, setSearchText] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [vegOnly, setVegOnly] = useState(false);
  const [costRange, setCostRange] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const debouncedSearchText = useDebounce(searchText, 500);

  const filteredRestaurants = useRestaurantFilters(listOfRestaurants, {
    searchText: debouncedSearchText,
    minRating,
    vegOnly,
    costRange,
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginatedRestaurants = filteredRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchText, minRating, vegOnly, costRange]);

  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="body page-shell">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="page-eyebrow">Curated for every craving</p>
          <h1>Discover restaurants that feel worth ordering from.</h1>
          <p>
            Browse faster, filter smarter, and build your cart in a cleaner,
            calmer interface.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>{filteredRestaurants.length}</span>
            <p>restaurants matching your filters</p>
          </div>
          <div className="stat-card">
            <span>{itemsPerPage}</span>
            <p>cards shown per page for easy browsing</p>
          </div>
        </div>
      </section>

      <SearchAndFilter
        searchText={searchText}
        setSearchText={setSearchText}
        minRating={minRating}
        setMinRating={setMinRating}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        costRange={costRange}
        setCostRange={setCostRange}
      />

      <div className="res-container">
        {paginatedRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            className="restaurant-link"
            to={`/restaurants/${slugifyRestaurantName(restaurant.info.name)}`}
          >
            <RestaurantCard resData={restaurant.info} />
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>Page {currentPage}</span>

        <button
          type="button"
          disabled={indexOfLastItem >= filteredRestaurants.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Body;
