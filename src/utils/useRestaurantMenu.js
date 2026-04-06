import { useEffect, useState } from "react";
import { getMenuByRestaurantName } from "./menuMockData";

export const useRestaurantMenu = (restaurantName = "") => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        if (!restaurantName) {
            setResInfo(null);
            return;
        }

        const menuData = getMenuByRestaurantName(restaurantName);
        setResInfo(menuData);
    }, [restaurantName]);

    return resInfo;
};

export default useRestaurantMenu;
