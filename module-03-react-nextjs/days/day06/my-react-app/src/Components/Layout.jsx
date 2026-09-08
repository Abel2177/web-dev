import { NavLink, Outlet, Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import ThemeButton from "./ThemeButton";

function Layout() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Addis Eats</h1>
        </Link>

        <div>
          <CartBadge />
          <ThemeButton />
        </div>
      </header>

      <nav className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Menu
        </NavLink>

        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Checkout
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Addis Eats</p>
      </footer>
    </>
  );
}

export default Layout;