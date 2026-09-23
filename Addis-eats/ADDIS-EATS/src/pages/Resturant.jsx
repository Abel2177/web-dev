import { useState } from 'react';
import { Link } from 'react-router-dom';

const RESTAURANTS_DATA = [
  {
    id: 1,
    name: 'Kategna Traditional Restaurant',
    cuisine: 'Ethiopian',
    rating: 4.9,
    deliveryTime: '25-35 min',
    minOrder: '$15',
    location: 'Bole Medhanialem',
    image:
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&auto=format&fit=crop&q=80',
    description:
      'Famous for authentic special kitfo, tibs, doro wat, and traditional fasting beyaynetu platters.',
    badge: 'Popular Choice',
  },
  {
    id: 2,
    name: 'Bole Burger & Grill Lounge',
    cuisine: 'Burgers',
    rating: 4.8,
    deliveryTime: '20-30 min',
    minOrder: '$10',
    location: 'Atlas, Bole',
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description:
      'Gourmet smash burgers, crispy chicken tenders, loaded truffle fries, and signature sauces.',
    badge: 'Fast Delivery',
  },
  {
    id: 3,
    name: 'Antica Woodfire Pizzeria',
    cuisine: 'Pizza',
    rating: 4.7,
    deliveryTime: '30-40 min',
    minOrder: '$18',
    location: 'Kazanchis',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    description:
      'Crispy artisanal crusts, buffalo mozzarella, fresh basil, and oven-baked calzones.',
    badge: 'Top Rated',
  },
  {
    id: 4,
    name: 'Tomoca Roastery & Patisserie',
    cuisine: 'Cafe',
    rating: 4.9,
    deliveryTime: '15-25 min',
    minOrder: '$8',
    location: 'Piassa & Sarbet',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    description:
      'Legendary Addis Ababa roast coffee, creamy macchiatos, fresh croissants, and tiramisu.',
    badge: 'Legendary',
  },
  {
    id: 5,
    name: 'Addis Deli & Sandwich Bar',
    cuisine: 'Sandwiches',
    rating: 4.6,
    deliveryTime: '20-30 min',
    minOrder: '$12',
    location: 'Sarbet',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    description:
      'Toasted paninis, triple-decker club sandwiches, avocado toasts, and cold-pressed juices.',
    badge: 'Fresh Daily',
  },
  {
    id: 6,
    name: 'Habesha Grill & Shawarma',
    cuisine: 'Grill',
    rating: 4.8,
    deliveryTime: '25-35 min',
    minOrder: '$14',
    location: 'CMC Michael',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    description:
      'Charcoal-grilled kebabs, juicy chicken shawarma wraps, hummus, and fresh pita bread.',
    badge: 'Chef Special',
  },
];

function Resturant() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Ethiopian', 'Burgers', 'Pizza', 'Cafe', 'Sandwiches', 'Grill'];

  const filteredRestaurants =
    selectedFilter === 'All'
      ? RESTAURANTS_DATA
      : RESTAURANTS_DATA.filter((r) => r.cuisine === selectedFilter);

  return (
    <div className="restaurant-page">
      <div className="page-header">
        <span className="page-pill">🏪 Top Partner Kitchens</span>
        <h1 className="page-title">Restaurants in Addis Ababa</h1>
        <p className="page-description">
          Order directly from popular Addis Ababa restaurants and enjoy quick, contactless delivery to your home or office.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="restaurant-filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-tab-btn ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Restaurant Grid */}
      <div className="restaurant-grid">
        {filteredRestaurants.map((res) => (
          <div key={res.id} className="restaurant-card">
            <div className="res-image-wrapper">
              <img src={res.image} alt={res.name} loading="lazy" />
              <span className="res-badge">{res.badge}</span>
              <span className="res-time">⏱️ {res.deliveryTime}</span>
            </div>

            <div className="res-body">
              <div className="res-header-row">
                <h3 className="res-name">{res.name}</h3>
                <span className="res-rating">★ {res.rating}</span>
              </div>

              <div className="res-meta">
                <span className="res-location">📍 {res.location}</span>
                <span className="res-min">Min: {res.minOrder}</span>
              </div>

              <p className="res-desc">{res.description}</p>

              <div className="res-footer">
                <span className="res-cuisine-tag">{res.cuisine}</span>
                <Link to="/menu" className="btn btn-primary btn-sm">
                  View Menu →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resturant;