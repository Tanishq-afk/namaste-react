import { useState } from "react";
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
  const debouncedSearchText = useDebounce(searchText, 500); 

const filteredRestaurants = useRestaurantFilters(listOfRestaurants, {
  searchText: debouncedSearchText,
  minRating,
  vegOnly,
  costRange,
});

  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="body">
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
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              className="restaurant-link"
              to={`/restaurants/${slugifyRestaurantName(restaurant.info.name)}`}
            >
              <RestaurantCard resData={restaurant.info} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
