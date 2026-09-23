import { useEffect, useState, useMemo } from 'react';
import Category from '../components/category';
import { useCart } from '../context/useCart';

const Categories = [
  { id: 'best-foods', label: "Today's Specials" },
  { id: 'Burgers', label: 'Best Burgers' },
  { id: 'Pizzas', label: 'Artisan Pizzas' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'desserts', label: 'Sweet Desserts' },
  { id: 'drinks', label: 'Chilled Drinks' },
];

function FoodApi({ initialCategory = 'best-foods' }) {
  const [category, setCategory] = useState(initialCategory);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    let ignore = false;

    const fetchCategoryFoods = async () => {
      try {
        const response = await fetch(`https://free-food-menus-api-two.vercel.app/${category}`);
        if (!response.ok) {
          throw new Error(`Failed to load menu items (${response.status})`);
        }
        const data = await response.json();
        if (!ignore) {
          setFoods(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to connect to the food menu service.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCategoryFoods();

    return () => {
      ignore = true;
    };
  }, [category, reloadTrigger]);

  const handleSelectCategory = (catId) => {
    setLoading(true);
    setError(null);
    setCategory(catId);
    setSearchTerm('');
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadTrigger((prev) => prev + 1);
  };

  const filteredFoods = useMemo(() => {
    let result = foods.filter((food) => {
      const matchesName = food.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDsc = food.dsc?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesName || matchesDsc;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => (b.rate || 0) - (a.rate || 0));
    }
    return result;
  }, [foods, searchTerm, sortBy]);

  const getItemCartQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="food-api-section">
      <Category
        categories={Categories}
        selectedCategory={category}
        onSelectCategory={handleSelectCategory}
      />

      <div className="menu-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by dish name or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-search-btn"
              type="button"
            >
              ×
            </button>
          )}
        </div>

        <div className="sort-box">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching delicious choices...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-state">
          <p className="error-msg">⚠️ {error}</p>
          <button
            onClick={handleRetry}
            className="btn btn-secondary"
            type="button"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredFoods.length === 0 && (
        <div className="empty-results">
          <span className="empty-icon">🍽️</span>
          <h3>No dishes found</h3>
          <p>Try searching with another keyword or pick a different category above.</p>
        </div>
      )}

      {!loading && !error && filteredFoods.length > 0 && (
        <div className="food-grid">
          {filteredFoods.map((food) => {
            const inCartQty = getItemCartQty(food.id);
            return (
              <div key={food.id} className="food-card">
                <div className="card-media">
                  <img
                    src={food.img}
                    alt={food.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div className="badge-rating">★ {food.rate || 4.5}</div>
                  {food.country && (
                    <div className="badge-origin">📍 {food.country}</div>
                  )}
                </div>

                <div className="card-body">
                  <div className="card-header-row">
                    <h3 className="food-title">{food.name}</h3>
                    <span className="food-price">${Number(food.price).toFixed(2)}</span>
                  </div>
                  <p className="food-dsc">{food.dsc}</p>

                  <div className="card-footer">
                    <button
                      className={`btn btn-primary add-cart-btn ${inCartQty > 0 ? 'added' : ''}`}
                      onClick={() => addToCart(food)}
                      type="button"
                    >
                      {inCartQty > 0 ? `✓ In Cart (${inCartQty})` : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FoodApi;