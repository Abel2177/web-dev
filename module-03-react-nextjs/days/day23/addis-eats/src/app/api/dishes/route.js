import { dishes } from "../../menu/dishes";

// dishes come from a static JSON file — no reason to skip the cache.
// Revalidate at most once per minute at the edge.

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit") || "6";

  let filtered = [...dishes];

  // 1. Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter(
      (d) => d.cuisine?.toLowerCase() === category.toLowerCase()
    );
  }

  // 2. Filter by search query (name, cuisine, tags, ingredients)
  if (search.trim()) {
    const term = search.trim().toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name?.toLowerCase().includes(term) ||
        d.cuisine?.toLowerCase().includes(term) ||
        d.tags?.some((t) => t.toLowerCase().includes(term)) ||
        d.ingredients?.some((i) => i.toLowerCase().includes(term))
    );
  }

  const total = filtered.length;

  // 3. Pagination support (if page parameter is provided)
  if (pageParam !== null) {
    const page = Math.max(1, parseInt(pageParam, 10) || 1);
    const limit = Math.max(1, parseInt(limitParam, 10) || 6);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const startIndex = (page - 1) * limit;
    const paginatedDishes = filtered.slice(startIndex, startIndex + limit);

    return Response.json(
      { dishes: paginatedDishes, total, page, totalPages, limit },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  }

  // If no pageParam provided, return full filtered list
  return Response.json(
    { dishes: filtered, total, page: 1, totalPages: 1, limit: total },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
