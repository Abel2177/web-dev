"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import DishCard from "./DishCard";

export default function SearchBox({ onSearchStateChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // 1. Debounce the search input by 300ms to avoid excessive network requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. NULL KEY: when search term is empty or whitespace, pass null.
  // SWR will not fetch anything when the key is null!
  const trimmed = debouncedTerm.trim();
  const searchKey = trimmed
    ? `/api/dishes?search=${encodeURIComponent(trimmed)}`
    : null;

  // 3. KEEP PREVIOUS DATA: keeps previous results visible during typing/refetching.
  // This completely eliminates flashing or blank screens between searches.
  // SWR also automatically discards out-of-order stale responses, preventing race conditions.
  const { data, error, isValidating } = useSWR(searchKey, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  const dishes = data?.dishes || [];
  const isSearching = Boolean(trimmed);

  function handleClear() {
    setSearchTerm("");
    setDebouncedTerm("");
  }

  return (
    <div className="search-box-wrapper">
      <div className="search-input-container">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes by name, cuisine, ingredients (e.g. Pizza, Curry, Pasta)…"
          aria-label="Search recipes"
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Live search feedback / status */}
      {isSearching && (
        <div className="search-status-bar" aria-live="polite">
          <span className="search-status-text">
            {isValidating
              ? `Searching for "${trimmed}"…`
              : `Found ${dishes.length} ${dishes.length === 1 ? "recipe" : "recipes"} for "${trimmed}"`}
          </span>
          {isValidating && <span className="search-spinner" aria-hidden="true" />}
        </div>
      )}

      {/* Render live search results if a search is active */}
      {isSearching && (
        <section
          className={`search-results-section ${isValidating ? "is-validating" : ""}`}
          aria-label="Search results"
        >
          {dishes.length === 0 && !isValidating ? (
            <p className="empty-state">No recipes match &quot;{trimmed}&quot;. Try searching for something else!</p>
          ) : (
            <div className="dish-grid">
              {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
