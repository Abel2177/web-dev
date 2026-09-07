import Menu from "./Components/Menu";
import CartBadge from "./Components/CartBadge";
import Checkout from "./Components/Checkout";
import FeaturedDishes from "./Components/FeaturedDishes";
import OrderStateDemo from "./Components/OrderStateDemo";
import ThemeButton from "./context/ThemeButton";
import  "./CSS/style.css"

function App() {
  return (
    <>
      <header>
        <h1>Addis Eats</h1>

        <div>
          <CartBadge />
          <ThemeButton />
        </div>
      </header>

      <main>
        <FeaturedDishes />

        <Menu />

        <Checkout />

        <OrderStateDemo />
      </main>
    </>
  );
}

export default App;