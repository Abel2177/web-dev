const categoryIcons = {
  'best-foods': '⭐',
  Burgers: '🍔',
  Pizzas: '🍕',
  sandwiches: '🥪',
  desserts: '🍰',
  drinks: '🥤',
};

function Category({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="categories-container">
      <div className="categories-list">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const icon = categoryIcons[cat.id] || '🍴';
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-pill ${isSelected ? 'active' : ''}`}
              type="button"
            >
              <span className="category-icon">{icon}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
