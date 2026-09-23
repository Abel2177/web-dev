import FoodApi from '../services/FoodApi';

function Menu() {
  return (
    <div className="menu-page">
      <div className="page-header">
        <span className="page-pill">🍽️ Freshly Prepared</span>
        <h1 className="page-title">Explore Our Full Menu</h1>
        <p className="page-description">
          Choose from juicy burgers, freshly baked pizzas, deli sandwiches, gourmet desserts, and refreshing drinks. Filter by category, search by ingredient, and order with 1-click!
        </p>
      </div>

      <FoodApi />
    </div>
  );
}

export default Menu;