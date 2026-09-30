"use client";

import { Suspense, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { foodData } from "../data/food";

export default function MenuClient() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

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
    <>
      <h1>Addis Eats Menu</h1>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList dishes={filteredMenu} />
      </Suspense>
    </>
  );
}