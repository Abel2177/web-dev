import Menu from "./components/Menu";
import CartBadge from "./components/CartBadge";
import Checkout from "./components/Checkout";
import FeaturedDishes from "./components/FeaturedDishes";
import OrderStateDemo from "./components/OrderStateDemo";
import ThemeButton from "./components/ThemeButton";
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