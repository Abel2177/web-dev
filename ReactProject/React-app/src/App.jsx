// App.jsx
import React, { createContext, useReducer } from "react";
import Home from "./Components/Home";
import BookList from "../public/Data";

export const CartContext = createContext(); // 👈 Named export

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <Home />
      <BookList />
    </CartContext.Provider>
  );
}

export default App;
