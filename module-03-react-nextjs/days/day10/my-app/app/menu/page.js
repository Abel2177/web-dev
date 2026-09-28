"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { foodData } from "../data/food";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Italian",
    "American",
    "Japanese",
  ];

  const filteredMenu =
    selectedCategory === "All"
      ? foodData
      : foodData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <main>
      <h1>Welcome to Addis Eats</h1>

      <p>This is the home page of your Next.js application.</p>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <DishList dishes={filteredMenu} />
    </main>
  );
}