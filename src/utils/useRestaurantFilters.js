import { useMemo } from "react";

const getRatingValue = (restaurant) => {
    const ratingValue = Number(restaurant?.info?.avgRating);
    return Number.isFinite(ratingValue) ? ratingValue : 0;
};

const getCostForTwoValue = (restaurant) => {
    const costValue = restaurant?.info?.costForTwo;

    if (typeof costValue === "number") {
        return costValue;
    }

    if (typeof costValue === "string") {
        const match = costValue.match(/\d+/);
        return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
    }

    return Number.POSITIVE_INFINITY;
};

const isPureVegDescription = (description = "") =>
    description.toLowerCase().includes("pureveg") || description.toLowerCase().includes("pure_veg");

const hasPureVegBadge = (info = {}) => {
    const imageBadges = info?.badges?.imageBadges || [];
    const imageBasedBadgeObjects = info?.badgesV2?.entityBadges?.imageBased?.badgeObject || [];

    const hasClassicBadge = imageBadges.some((badge) =>
        isPureVegDescription(String(badge?.description || "")),
    );

    if (hasClassicBadge) {
        return true;
    }

    return imageBasedBadgeObjects.some((badgeObject) =>
        isPureVegDescription(String(badgeObject?.attributes?.description || "")),
    );
};

const isVegRestaurant = (restaurant) => {
    const info = restaurant?.info || {};
    return info.veg === true || hasPureVegBadge(info);
};

const useRestaurantFilters = (
    restaurants = [],
    { minRating = 0, vegOnly = false, costRange = null, searchText = "" } = {},
) => {
    const filteredRestaurants = useMemo(() => {
        const normalizedSearchText = searchText.trim().toLowerCase();

        return restaurants.filter((restaurant) => {
            const restaurantName = restaurant?.info?.name?.toLowerCase() || "";
            const passesSearch = normalizedSearchText
                ? restaurantName.includes(normalizedSearchText)
                : true;
            const passesRating = minRating ? getRatingValue(restaurant) >= minRating : true;
            const passesVeg = vegOnly ? isVegRestaurant(restaurant) : true;

            let passesCost = true;
            if (Array.isArray(costRange) && costRange.length === 2) {
                const restaurantCost = getCostForTwoValue(restaurant);
                passesCost = restaurantCost >= costRange[0] && restaurantCost <= costRange[1];
            }

            return passesSearch && passesRating && passesVeg && passesCost;
        });
    }, [restaurants, searchText, minRating, vegOnly, costRange]);

    return filteredRestaurants;
};
 
export default useRestaurantFilters;
