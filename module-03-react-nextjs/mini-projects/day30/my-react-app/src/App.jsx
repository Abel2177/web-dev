import Menu from "./components/Menu";
import CartBadge from "./components/CartBadge";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <header>
        <h1>Addis Eats</h1>
        <CartBadge />
      </header>

      <main>
        <Menu />
        <Checkout />
      </main>
    </>
  );
}

export default App;