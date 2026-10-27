"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(dish) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.dishId === dish.id);
      if (existingItem) {
        return currentItems.map((item) => item.dishId === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }

      return [...currentItems, { dishId: dish.id, name: dish.name, quantity: 1 }];
    });
  }

  const value = useMemo(() => ({ items, setItems, addItem }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
