"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import AddToOrderButton from "@/app/components/AddToOrderButton";

export default function LiveDishList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);


  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
  const currentSearch = searchParams.get("search") || "";

  if (currentSearch === debouncedSearch) return;

  const params = new URLSearchParams(searchParams.toString());

  if (debouncedSearch) {
    params.set("search", debouncedSearch);
  } else {
    params.delete("search");
  }

  params.delete("page");

  const query = params.toString();
  router.replace(query ? `${pathname}?${query}` : pathname, {
    scroll: false,
  });
}, [debouncedSearch, pathname, router, searchParams]);

  const { data, error, isPending, isPlaceholderData } = useQuery({
    queryKey: ["dishes", { search: debouncedSearch, page }],
    queryFn: () =>
      fetcher(
        `/api/dishes?search=${encodeURIComponent(debouncedSearch)}&page=${page}`
      ),
    placeholderData: keepPreviousData,
  });

  function goToPage(nextPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const dishes = data?.data ?? [];

  return (
    <section className="space-y-6">
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search Ethiopian dishes..."
        aria-label="Search dishes"
        className="w-full rounded-lg border p-3"
      />

      {isPending && !data && (
        <p className="text-gray-500">Loading dishes...</p>
      )}

      {error && <p role="alert">{error.message}</p>}

      {data && (
        <>
          {isPlaceholderData && (
            <p className="text-sm text-gray-500">Updating results...</p>
          )}

          {dishes.length === 0 ? (
            <p>No dishes found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dishes.map((dish) => (
                <article key={dish.id} className="rounded-xl border p-6 shadow-sm">
                  <h2 className="mb-2 text-xl font-semibold">{dish.name}</h2>
                  <p className="mb-4 text-gray-600">{dish.description}</p>
                  <p className="mb-4 font-bold">{dish.price} ETB</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/menu/${dish.id}`}
                      className="rounded-lg border border-orange-600 px-4 py-2 text-orange-700"
                    >
                      View Dish
                    </Link>
                    <AddToOrderButton dish={dish} />
                  </div>
                </article>
              ))}
            </div>
          )}

          <nav aria-label="Dish pages" className="flex items-center gap-4">
            <button
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
              className="rounded border px-4 py-2 disabled:opacity-40"
            >
              Previous
            </button>
            <span>
              Page {page} of {data?.pagination?.totalPages ?? 1}
            </span>            
            <button
              disabled={page >= (data?.pagination?.totalPages ?? 1)}
              onClick={() => goToPage(page + 1)}
              className="rounded border px-4 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </section>
  );
}