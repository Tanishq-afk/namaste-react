import { useEffect, useState } from "react";

const useRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
        );
        const json = await data.json();
        const cards = json?.data?.cards || [];
        const restaurants =
          cards.find((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        if (!isCancelled) {
          setListOfRestaurants(restaurants);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        if (!isCancelled) {
          setListOfRestaurants([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { listOfRestaurants, isLoading };
};

export default useRestaurants;
