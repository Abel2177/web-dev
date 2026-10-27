"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import DishCard from "./DishCard";

export default function PagedDishList({
  initialDishes,
  initialTotal,
  initialPage = 1,
  initialTotalPages = 1,
  category = "all",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current page from URL query string; default to initialPage or 1
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : initialPage;

  // Query Key for Paged Dishes:
  // Key format: `/api/dishes?page=${currentPage}&category=${category}`
  // Refresh rule: keepPreviousData: true (prevents flashing when paging), dedupingInterval: 60000ms
  const queryKey = `/api/dishes?page=${currentPage}&category=${encodeURIComponent(category)}`;

  const isInitial = currentPage === initialPage;

  const { data, isValidating } = useSWR(queryKey, fetcher, {
    fallbackData: isInitial
      ? {
          dishes: initialDishes,
          total: initialTotal,
          page: initialPage,
          totalPages: initialTotalPages,
        }
      : undefined,
    keepPreviousData: true,
    dedupingInterval: 60000, // Dishes change rarely, cache for 60s
    revalidateOnFocus: false,
  });

  const dishes = data?.dishes || initialDishes || [];
  const total = data?.total ?? initialTotal ?? 0;
  const totalPages = data?.totalPages ?? initialTotalPages ?? 1;

  function goToPage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/menu?${params.toString()}`);
  }

  if (dishes.length === 0 && !isValidating) {
    return <p className="empty-state">No recipes match this category.</p>;
  }

  return (
    <div className="paged-dish-section">
      <div className="paged-header-row">
        <span className="results-count">
          Showing {dishes.length} of {total} {category === "all" ? "recipes" : `${category} recipes`}
        </span>
        {isValidating && (
          <span className="page-updating-badge">Updating page…</span>
        )}
      </div>

      <div className={`dish-grid ${isValidating ? "is-validating" : ""}`}>
        {dishes.map((dish, index) => (
          <DishCard key={dish.id} dish={dish} priority={index === 0} />
        ))}
      </div>

      {/* Pagination controls with page number in the query string */}
      {totalPages > 1 && (
        <nav className="pagination-bar" aria-label="Menu pagination">
          <button
            type="button"
            className="pagination-btn nav-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isValidating}
            aria-label="Previous page"
          >
            ← Previous
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`pagination-btn page-num ${pageNum === currentPage ? "is-active" : ""}`}
                onClick={() => goToPage(pageNum)}
                aria-current={pageNum === currentPage ? "page" : undefined}
                disabled={isValidating && pageNum === currentPage}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="pagination-btn nav-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages || isValidating}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
