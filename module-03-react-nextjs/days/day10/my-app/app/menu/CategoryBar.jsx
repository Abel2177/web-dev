"use client";

export default function CategoryBar({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}