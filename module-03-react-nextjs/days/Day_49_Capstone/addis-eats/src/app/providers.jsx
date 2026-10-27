"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [hasLoadedFavorites, setHasLoadedFavorites] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedCart = window.localStorage.getItem("addis-eats-cart");
        if (savedCart) setItems(JSON.parse(savedCart));
      } catch {
        window.localStorage.removeItem("addis-eats-cart");
      } finally {
        setHasLoadedCart(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasLoadedCart) {
      window.localStorage.setItem("addis-eats-cart", JSON.stringify(items));
    }
  }, [hasLoadedCart, items]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedFavorites = window.localStorage.getItem("addis-eats-favorites");
        if (savedFavorites) {
          const parsed = JSON.parse(savedFavorites);
          if (Array.isArray(parsed)) setFavoriteIds(parsed);
        }
      } catch {
        window.localStorage.removeItem("addis-eats-favorites");
      } finally {
        setHasLoadedFavorites(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasLoadedFavorites) {
      window.localStorage.setItem("addis-eats-favorites", JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, hasLoadedFavorites]);

  function addItem(dish) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.dishId === dish.id);
      if (existingItem) {
        return currentItems.map((item) => item.dishId === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }

      return [...currentItems, { dishId: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
    });
  }

  function removeItem(dishId) {
    setItems((currentItems) => currentItems.filter((item) => item.dishId !== dishId));
  }

  function toggleFavorite(dishId) {
    setFavoriteIds((currentIds) => currentIds.includes(dishId)
      ? currentIds.filter((id) => id !== dishId)
      : [...currentIds, dishId]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const value = useMemo(() => ({ items, setItems, addItem, removeItem, itemCount, total, favoriteIds, toggleFavorite }), [items, itemCount, total, favoriteIds]);
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
