import recipeData from "../../data/recipes.json";

// The menu and API deliberately share this one JSON-backed data source.
export const dishes = recipeData.recipes.map((dish) => ({
  ...dish,
  price: dish.price ?? Math.max(150, Math.ceil(dish.caloriesPerServing / 50) * 50),
  summary: dish.summary ?? `${dish.difficulty} ${dish.cuisine} recipe with ${dish.ingredients.slice(0, 3).join(", ")}.`,
}));

export async function getDishes() {
  return dishes;
}

export function findDish(id) {
  return dishes.find((dish) => String(dish.id) === String(id));
}
