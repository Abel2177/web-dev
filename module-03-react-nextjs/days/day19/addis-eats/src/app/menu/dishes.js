import recipeData from "../../data/recipes.json";

// The menu and API deliberately share this one JSON-backed data source.
export const dishes = recipeData.recipes;

export async function getDishes() {
  return dishes;
}

export function findDish(id) {
  return dishes.find((dish) => String(dish.id) === String(id));
}
