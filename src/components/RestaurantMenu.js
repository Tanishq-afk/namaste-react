import { useParams } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { useState } from "react";
import useSortedMenu from "../utils/useSortedMenu";

const formatPrice = (price = 0) => {
    if (price >= 1000) {
        return `₹${(price / 100).toFixed(2)}`;
    }
    return `₹${price}`;
};

const RestaurantMenu = () => {
  const { restaurantName = "" } = useParams();
  const resInfo = useRestaurantMenu(restaurantName);

  const [sortType, setSortType] = useState(null);

  const sortedMenu = useSortedMenu(resInfo?.menu, sortType);

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

      {/* ✅ ADD THIS */}
      <div className="sort-buttons">
        <button className="btn" onClick={() => setSortType("PRICE_LOW_TO_HIGH")}>
          Price ↑
        </button>

        <button className="btn" onClick={() => setSortType("PRICE_HIGH_TO_LOW")}>
          Price ↓
        </button>

        <button className="btn" onClick={() => setSortType(null)}>
          Reset
        </button>
      </div>

      {sortedMenu?.map((category) => (
        <div key={category.categoryId} className="menu-category">
          <h3>{category.title}</h3>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span> -{" "}
                <span>{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;