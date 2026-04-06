import { useParams } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";

const formatPrice = (price = 0) => {
    if (price >= 1000) {
        return `₹${(price / 100).toFixed(2)}`;
    }
    return `₹${price}`;
};

const RestaurantMenu = () => {
    const { restaurantName = "" } = useParams();
    const resInfo = useRestaurantMenu(restaurantName);

    if (!resInfo) {
        return (
            <div className="menu">
                <h1>Menu not found</h1>
                <p>
                    We could not find menu data for{" "}
                    <strong>{restaurantName || "this restaurant"}</strong>.
                </p>
            </div>
        );
    }

    return (
        <div className="menu">
            <h1>{resInfo.name}</h1>
            <h2>Menu</h2>
            {resInfo.menu?.map((category) => (
                <div key={category.categoryId} className="menu-category">
                    <h3>{category.title}</h3>
                    <ul>
                        {category.items.map((item) => (
                            <li key={item.id}>
                                <span>{item.name}</span> - <span>{formatPrice(item.price)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default RestaurantMenu;
