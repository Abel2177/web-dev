import { useState, useEffect, useRef } from "react";
import Dish from "./components/Dish";
import CategoryBar from "./components/CategoryBar";
import OrderForm from "./components/OrderForm";




function App() {
  
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchRef = useRef(null);

  // useEffect(() =>{
  //   searchRef.current.focus();
  // }, []);

  useEffect(() => {
    if (!loading && searchRef.current) {
      searchRef.current.focus();
    }
  }, [loading]);

  useEffect(() =>{
    document.title = `${menu.length} dishes`;
  }, [menu]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch("/dishes.json",{
          signal: controller.signal,
        });

        if(!res.ok){
          throw new Error("Could not load the menu. Please try again.");
        }

        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Could not load the menu. Please try again."
          );
        }

        const data = await res.json();
        
        setMenu(data);
      } catch (error) {
        if (error.name !== "AbortError"){
          setError(error);
        }
      } finally {
        setLoading(false);
      }
      
    }

    fetchData();

    return() =>{
      controller.abort();
    };

  },[category]);

  if(loading){
    return <p>Loading menu...</p>
  }
  if(error){
    return <p>Error loading menu: {error.message}</p>
  }

  
  const shown =
    category === "All"
      ? menu
      : menu.filter(
        (item) => item.category === category
      );

  
  function addToOrder(price) {
    setTotal(total + price);
  }

 
  if (shown.length === 0) {
    return (
      <div>
        <h2>Addis Eats - Our Menu</h2>

        <category
          selected={category}
          onSelectCategory={setCategory}
        />

        <p>No dishes found.</p>

        <h2>Total: {total} ETB</h2>

        <OrderForm />
      </div>
    );
  }

  return (
    <div>
      <h2>Addis Eats - Our Menu</h2>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search dishes..."
      />
      <CategoryBar
        selected={category}
        onSelectCategory={setCategory}
      />

      <div className="card-container">
        {shown.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={addToOrder}
          />
        ))}
      </div>

      <h2>Total: {total} ETB</h2>

      <OrderForm />
    </div>
  );
}

export default App;