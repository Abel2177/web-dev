import React from "react";

export default function Category({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="categories">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={selectedCategory === cat.id ? "active" : ""}
                    onClick={() => onSelectCategory(cat.id)}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
