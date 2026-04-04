import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { slugifyRestaurantName } from "../utils/restaurantName";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    const fetchData = async () => {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            const restaurants =
                json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            setListOfRestaurants(restaurants);
            setFilteredRestaurant(restaurants);
        } catch (error) {
            console.error("Failed to fetch restaurants:", error);
            setListOfRestaurants([]);
            setFilteredRestaurant([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (listOfRestaurants.length === 0) {
        return <Shimmer />
    }

    return (
        <div className="body">
            <div className="filter">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                        setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                        const text = searchText.trim().toLowerCase();
                        const filteredRestaurant = listOfRestaurants.filter((res) =>
                            res.info.name.toLowerCase().includes(text)
                        );
                        setFilteredRestaurant(filteredRestaurant);
                        }}
                        className="btn">
                    Search
                    </button>
                
                <button className="btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter(restaurant => restaurant.info.avgRating > 4.5); 
                    setFilteredRestaurant(filteredList);
                }}>Top Rated Restaurants</button>
            </div>
            <div className="res-container">
                {filteredRestaurant.map((restaurant) => {
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
}

export default Body;
