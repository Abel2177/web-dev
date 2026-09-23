import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

function Navbar() {
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">🍲</span>
          <div className="brand-text">
            <span className="brand-name">Addis Eats</span>
            <span className="brand-tagline">Flavor Delivered Fast</span>
          </div>
        </Link>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <nav className={`navbar-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Menu
          </NavLink>
          <NavLink
            to="/resturant"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Restaurants
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'nav-link active cart-link' : 'nav-link cart-link')}
            onClick={closeMenu}
          >
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? 'nav-link checkout-btn' : 'nav-link checkout-btn')}
            onClick={closeMenu}
          >
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
