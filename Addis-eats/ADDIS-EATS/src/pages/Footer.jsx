import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-brand">
            <span className="footer-brand-icon">🍲</span>
            <span className="footer-brand-name">Addis Eats</span>
          </Link>
          <p className="footer-tagline">
            Addis Ababa&apos;s favorite food delivery experience. Connecting you with top local restaurants, chefs, and fast couriers every day.
          </p>
          <div className="footer-hours">
            <span>⏰ Open Daily: <strong>8:00 AM – 11:00 PM</strong></span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Explore Menu</Link></li>
            <li><Link to="/resturant">Restaurants</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Cuisines</h4>
          <ul className="footer-links">
            <li><Link to="/menu">Today&apos;s Specials</Link></li>
            <li><Link to="/menu">Artisan Pizzas</Link></li>
            <li><Link to="/menu">Gourmet Burgers</Link></li>
            <li><Link to="/menu">Fresh Sandwiches</Link></li>
            <li><Link to="/menu">Pastries &amp; Drinks</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact &amp; Delivery</h4>
          <p className="footer-contact-item">📍 Bole Road, Addis Ababa, Ethiopia</p>
          <p className="footer-contact-item">📞 +251 91 123 4567</p>
          <p className="footer-contact-item">✉️ support@addiseats.com</p>
          <div className="payment-badges">
            <span className="pay-badge">Telebirr</span>
            <span className="pay-badge">CBE Birr</span>
            <span className="pay-badge">Cash</span>
            <span className="pay-badge">Cards</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Addis Eats. All rights reserved.</p>
        <p className="footer-credits">Made with ❤️ for food lovers in Addis Ababa.</p>
      </div>
    </footer>
  );
}

export default Footer;