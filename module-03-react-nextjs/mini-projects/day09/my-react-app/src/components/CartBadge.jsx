import { useCartStore } from "../store/cartStore";

function CartBadge() {
  const items = useCartStore((state) => state.items);

  return (
    <span>
      🛒 {items.length}
    </span>
  );
}

export default CartBadge;