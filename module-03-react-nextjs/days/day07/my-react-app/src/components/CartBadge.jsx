import { useContext } from "react";
import { CartContext } from "./CartProvider";

function CartBadge() {
  const { items } = useContext(CartContext);

  return <span>Cart: {items.length}</span>;
}

export default CartBadge;