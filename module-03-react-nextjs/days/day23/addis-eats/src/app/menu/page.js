import { getDishes } from "./dishes";
import CategoryBar from "./CategoryBar";
import SearchBox from "./SearchBox";
import PagedDishList from "./PagedDishList";

export const metadata = {
  title: "Menu",
  description: "Browse Addis Eats recipes, from quick lunches to shareable dinners, and add your favourites to your order.",
  alternates: { canonical: "/menu" },
};

// This route refreshes at most once per hour on the server
export const revalidate = 3600;

const PAGE_SIZE = 6;

export default async function MenuPage({ searchParams }) {
  const [{ category = "all", page = "1" }, dishes] = await Promise.all([
    searchParams,
    getDishes(),
  ]);

  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const matchingDishes =
    category === "all"
      ? dishes
      : dishes.filter((dish) => dish.cuisine === category);

  const total = matchingDishes.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageDishes = matchingDishes.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <CategoryBar activeCategory={category}>
      <p className="eyebrow">Recipe menu</p>
      <h1>Made for sharing</h1>
      <p>Browse recipes supplied by the local JSON API.</p>

      {/* Debounced live search with null key when empty & keepPreviousData */}
      <SearchBox />

      {/* Paged dish list with page number in query string & keepPreviousData */}
      <PagedDishList
        initialDishes={pageDishes}
        initialTotal={total}
        initialPage={currentPage}
        initialTotalPages={totalPages}
        category={category}
      />
    </CategoryBar>
  );
}
