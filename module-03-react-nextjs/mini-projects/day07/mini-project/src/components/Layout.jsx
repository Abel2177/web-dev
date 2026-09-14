import { Link, Outlet } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Layout() {
  const items = useCartStore((state) => state.items);

  return (
    <>
      <header>
        <h1>Addis Eats</h1>

        <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="/menu">Menu</Link>{" "}
          <Link to="/cart">Cart ({items.length})</Link>{" "}
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;