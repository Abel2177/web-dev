"use client";

import { useState } from "react";
import { useCart } from "../providers";

export default function AddToCart({ dish }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(dish);
    setAdded(true);
  }

  return <button className="add-to-cart" type="button" onClick={handleAddToCart}>{added ? "Added to cart" : "Add to cart"}</button>;
}
