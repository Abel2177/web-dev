// Home.jsx
import React, { useContext } from "react";
import { CartContext } from "../App"; 

function Home() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <nav>
        <h2>BookShop</h2>
        <p>Discover new books</p>
      </nav>
      <main>
        <section>
          <h3>Featured Books</h3>
        </section>
      </main>
      <p>Cart Items: {cart.length}</p>
    </div>
  );
}

export default Home;
