import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

const emptyCart = {
  restaurantId: null,
  restaurantName: "",
  items: [],
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(emptyCart);

  const addItem = (item, restaurant) => {
    if (!restaurant?.restaurantId) {
      return { ok: false, reason: "INVALID_RESTAURANT" };
    }

    if (cart.restaurantId && cart.restaurantId !== restaurant.restaurantId) {
      return {
        ok: false,
        reason: "DIFFERENT_RESTAURANT",
        currentRestaurantName: cart.restaurantName,
      };
    }

    setCart((prev) => {
      const existingItem = prev.items.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        restaurantId: restaurant.restaurantId,
        restaurantName: restaurant.restaurantName,
        items: [...prev.items, { ...item, quantity: 1 }],
      };
    });

    return { ok: true };
  };

  const removeItem = (itemId) => {
    setCart((prev) => {
      const nextItems = prev.items.filter((item) => item.id !== itemId);
      if (nextItems.length === 0) {
        return emptyCart;
      }

      return {
        ...prev,
        items: nextItems,
      };
    });
  };

  const decreaseItemQuantity = (itemId) => {
    setCart((prev) => {
      const target = prev.items.find((item) => item.id === itemId);
      if (!target) {
        return prev;
      }

      if (target.quantity <= 1) {
        const nextItems = prev.items.filter((item) => item.id !== itemId);
        if (nextItems.length === 0) {
          return emptyCart;
        }
        return { ...prev, items: nextItems };
      }

      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    });
  };

  const clearCart = () => {
    setCart(emptyCart);
  };

  const clearCartAndAddItem = (item, restaurant) => {
    setCart({
      restaurantId: restaurant.restaurantId,
      restaurantName: restaurant.restaurantName,
      items: [{ ...item, quantity: 1 }],
    });
  };

  const totals = useMemo(() => {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      totalItems,
      totalPrice,
    };
  }, [cart.items]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        decreaseItemQuantity,
        clearCart,
        clearCartAndAddItem,
        totalItems: totals.totalItems,
        totalPrice: totals.totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
