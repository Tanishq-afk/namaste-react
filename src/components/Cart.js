import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const formatPrice = (price = 0) => `₹${(price / 100).toFixed(2)}`;

const Cart = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const {
    cart,
    addItem,
    removeItem,
    decreaseItemQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleIncrease = (item) => {
    if (!auth.token) {
      alert("Please login first to add more items.");
      navigate("/login");
      return;
    }

    addItem(item, {
      restaurantId: cart.restaurantId,
      restaurantName: cart.restaurantName,
    });
  };

  const isEmpty = cart.items.length === 0;

  if (isEmpty) {
    return (
      <div className="cart-page cart-page-empty page-shell">
        <section className="page-hero empty-state">
          <p className="page-eyebrow">Your Cart</p>
          <h1>Your cart is feeling light.</h1>
          <p>Your cart is empty right now. Add items from a restaurant menu.</p>
        </section>
        <Link to="/" className="btn cart-link-btn">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page page-shell">
      <div className="cart-header page-card">
        <div>
          <p className="page-eyebrow">Your Cart</p>
          <h1>Ready for checkout?</h1>
          <p className="cart-restaurant">From: {cart.restaurantName}</p>
        </div>
        <button className="btn btn-secondary" type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items-grid">
        {cart.items.map((item) => (
          <div key={item.id} className="cart-item-card">
            <h3>{item.name}</h3>
            {item.description && <p>{item.description}</p>}
            <p className="cart-item-price">{formatPrice(item.price)}</p>

            <div className="cart-item-actions">
              <button
                className="btn cart-qty-btn"
                type="button"
                onClick={() => decreaseItemQuantity(item.id)}
              >
                -
              </button>
              <span className="cart-qty">{item.quantity}</span>
              <button
                className="btn cart-qty-btn"
                type="button"
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>
          <span className="summary-label">Total Items</span>
          <p>{totalItems}</p>
        </div>
        <div>
          <span className="summary-label">Total Price</span>
          <p>{formatPrice(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
