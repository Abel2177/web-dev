import { createContext, useMemo, useReducer } from "react";
import { cartReducer } from "../cartReducer";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const total = state.items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;