import { useNavigate, useParams } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { useState } from "react";
import useSortedMenu from "../utils/useSortedMenu";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const formatPrice = (price = 0) => {
  if (price >= 1000) {
    return `₹${(price / 100).toFixed(2)}`;
  }
  return `₹${price}`;
};

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { restaurantName = "" } = useParams();
  const resInfo = useRestaurantMenu(restaurantName);
  const { auth } = useAuth();
  const { addItem, clearCartAndAddItem } = useCart();

  const [sortType, setSortType] = useState(null);
  const [popupState, setPopupState] = useState({
    open: false,
    item: null,
    currentRestaurantName: "",
  });

  const sortedMenu = useSortedMenu(resInfo?.menu, sortType);

  const handleAddToCart = (item) => {
    if (!auth.token) {
      alert("Please login first to add items to cart.");
      navigate("/login");
      return;
    }

    const result = addItem(item, {
      restaurantId: resInfo.restaurantId,
      restaurantName: resInfo.name,
    });

    if (!result.ok && result.reason === "DIFFERENT_RESTAURANT") {
      setPopupState({
        open: true,
        item,
        currentRestaurantName: result.currentRestaurantName || "",
      });
    }
  };

  const handleClearAndAdd = () => {
    if (!popupState.item || !resInfo) return;

    clearCartAndAddItem(popupState.item, {
      restaurantId: resInfo.restaurantId,
      restaurantName: resInfo.name,
    });

    setPopupState({ open: false, item: null, currentRestaurantName: "" });
  };

  const closePopup = () => {
    setPopupState({ open: false, item: null, currentRestaurantName: "" });
  };

  if (!resInfo) {
    return (
      <div className="menu page-shell menu-empty">
        <h1>Menu not found</h1>
        <p>
          We could not find menu data for{" "}
          <strong>{restaurantName || "this restaurant"}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="menu page-shell">
      <div className="menu-header">
        <p className="page-eyebrow">Restaurant Menu</p>
        <h1>{resInfo.name}</h1>
        <p>Pick your favourites and add them to the cart in a few clicks.</p>
      </div>

      <div className="sort-buttons">
        <button
          className="btn"
          type="button"
          onClick={() => setSortType("PRICE_LOW_TO_HIGH")}
        >
          Price ↑
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => setSortType("PRICE_HIGH_TO_LOW")}
        >
          Price ↓
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setSortType(null)}
        >
          Reset
        </button>
      </div>

      {sortedMenu?.map((category) => (
        <div key={category.categoryId} className="menu-category">
          <div className="menu-category-header">
            <h3>{category.title}</h3>
            <span>{category.items.length} items</span>
          </div>
          <div className="menu-items-grid">
            {category.items.map((item) => (
              <div key={item.id} className="menu-item-card">
                <h4>{item.name}</h4>
                {item.description && <p>{item.description}</p>}
                <p className="menu-item-price">{formatPrice(item.price)}</p>
                <button
                  className="btn"
                  type="button"
                  onClick={() => handleAddToCart(item)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {popupState.open && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Items from another restaurant already in cart</h3>
            <p>
              Your cart currently has items from{" "}
              <strong>{popupState.currentRestaurantName}</strong>.
            </p>
            <p>Clear cart first to add items from {resInfo.name}.</p>
            <div className="modal-actions">
              <button className="btn" type="button" onClick={handleClearAndAdd}>
                Clear Cart
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
