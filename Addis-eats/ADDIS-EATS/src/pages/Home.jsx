import { Link } from 'react-router-dom';
import FoodApi from '../services/FoodApi';

function Home() {
  const quickCategories = [
    { name: 'Burgers', icon: '🍔', desc: 'Juicy craft patties' },
    { name: 'Pizzas', icon: '🍕', desc: 'Stone baked & cheesy' },
    { name: 'Sandwiches', icon: '🥪', desc: 'Fresh deli favorites' },
    { name: 'Desserts', icon: '🍰', desc: 'Sweet treats & pastries' },
    { name: 'Drinks', icon: '🥤', desc: 'Cold shakes & juices' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-pill">🚀 Fast Delivery in Addis Ababa</span>
          <h1 className="hero-title">
            Taste the Best Dishes <br />
            <span>Delivered Fresh to Your Door</span>
          </h1>
          <p className="hero-subtitle">
            Craving your favorite comfort food or discovering new flavors? Addis Eats brings top chef-crafted meals, authentic flavors, and lightning-fast delivery to your table.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Full Menu 🍽️
            </Link>
            <Link to="/resturant" className="btn btn-outline btn-lg">
              Browse Restaurants 🏪
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Partner Eateries</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">25-35m</span>
              <span className="stat-label">Avg. Delivery</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">4.9 ★</span>
              <span className="stat-label">Customer Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop&q=80"
              alt="Delightful food spread"
              className="hero-image"
            />
            <div className="floating-badge badge-top">
              <span className="badge-emoji">🔥</span>
              <div>
                <strong>Hot & Fresh</strong>
                <small>Guaranteed warm</small>
              </div>
            </div>
            <div className="floating-badge badge-bottom">
              <span className="badge-emoji">⚡</span>
              <div>
                <strong>Telebirr Ready</strong>
                <small>Instant payments</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Discovery */}
      <section className="section category-discovery">
        <div className="section-header">
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">What are you in the mood for today?</p>
        </div>
        <div className="quick-cat-grid">
          {quickCategories.map((cat) => (
            <Link to="/menu" key={cat.name} className="quick-cat-card">
              <span className="quick-cat-icon">{cat.icon}</span>
              <h3 className="quick-cat-name">{cat.name}</h3>
              <p className="quick-cat-desc">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Addis Eats */}
      <section className="section features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Addis Eats</h2>
          <p className="section-subtitle">Food ordering crafted for speed, convenience, and great taste</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛵</div>
            <h3>Swift Delivery</h3>
            <p>Our dedicated riders ensure your meals arrive piping hot directly to your home or office.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍲</div>
            <h3>Premium Kitchens</h3>
            <p>Every restaurant and recipe is vetted for hygiene, authentic flavors, and superior quality.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Pay conveniently using Telebirr, CBE Birr, Debit Cards, or Cash on Delivery.</p>
          </div>
        </div>
      </section>

      {/* Today's Special Section */}
      <section className="section specials-section">
        <div className="section-header">
          <div className="specials-badge">Chef Recommendations</div>
          <h2 className="section-title">Today&apos;s Featured Specials</h2>
          <p className="section-subtitle">Order our most loved, top-rated dishes right away</p>
        </div>

        <FoodApi initialCategory="best-foods" />

        <div className="view-more-container">
          <Link to="/menu" className="btn btn-primary btn-lg">
            View All Categories &amp; Dishes →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
