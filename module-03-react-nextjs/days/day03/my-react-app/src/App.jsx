import React, { useState } from "react";
import Dish from "./components/Dish";
import CategoryBar from "./components/Category";
import OrderForm from "./components/OrderForm";
import './App.css'
const menu = [
  { id: 1, name: "Doro Wet", price: 250, catagory: "main", isSpicy: true },
  { id: 2, name: "Kitfo", price: 350, catagory: "main", isSpicy: true },
  { id: 3, name: "Shiro", price: 150, catagory: "side", isSpicy: false },
  { id: 4, name: "Injera", price: 50, catagory: "side", isSpicy: false },
  { id: 5, name: "Ayib", price: 100, catagory: "side", isSpicy: false },
  { id: 6, name: "Gomen", price: 100, catagory: "side", isSpicy: false },
  { id: 7, name: "Tibs", price: 300, catagory: "main", isSpicy: true },
  { id: 8, name: "Beyainetu", price: 250, catagory: "main", isSpicy: false },
];

const categories = ["All", "main", "side"];

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems]=useState(0);
  
  function handleAdd(price) {
    setTotalPrice((prevTotal) => prevTotal + price); 
  }
function  handleTotalItems(){
  setTotalItems(totalItems+1);
}

  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((dish) => dish.catagory === selectedCategory);

  return (
    <>
    <main className="menu-container">
      <h3>Number of Selected Items:{totalItems}</h3>
      <h2>Total price: {totalPrice} ETB</h2>

      <CategoryBar
        categorys={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <p>Selected Category: {selectedCategory}</p>

      <div className="menu-container">
        {filteredMenu.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            catagory={dish.catagory}
            isSpicy={dish.isSpicy}
            onAdd={handleAdd}
            onItem={handleTotalItems}
          />
        ))}
      </div>

      <OrderForm/>
    </main>


  

    </>
  );
}

export default Main;