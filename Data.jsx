import React, { useEffect, useState } from "react";
import Books from "../src/Components/Books";
import Category from "../src/Components/Category";
import "../src/App.css";
function BookList() {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("bestsellers");
    const [loading, setLoading] = useState(false);
   const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
});
    const CATEGORIES = [
        { id: 'bestsellers', label: 'All / Trending' },
        { id: 'fiction', label: 'Fiction' },
        { id: 'science_fiction', label: 'Sci-Fi' },
        { id: 'fantasy', label: 'Fantasy' },
        { id: 'mystery', label: 'Mystery' },
        { id: 'computer_science', label: 'Technology' },
        { id: 'history', label: 'History' },
    ];
    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://openlibrary.org/subjects/${selectedCategory}.json?limit=32`
                );
                const data = await response.json();
                setBooks(data.works || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, [selectedCategory]);

     useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
     }, [favorites]);
   function toggleFavorite(book) {
    setFavorites((prev) => {
        const exists = prev.some((fav) => fav.key === book.key);

        if (exists) {
            return prev.filter((fav) => fav.key !== book.key);
        }

        return [...prev, book];
    });
}

    async function handleSearch(e) {
        e.preventDefault();
        const query = e.target.search.value;
        if (!query) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            setBooks(
  (data.docs || []).map((doc) => ({
    key: doc.key,
    title: doc.title,
    authors: doc.author_name ? doc.author_name.map((name) => ({ name })) : [],
    cover_id: doc.cover_i, // ✅ unify field name
    first_publish_year: doc.first_publish_year,
  }))
);
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" name="search" placeholder="Search for books..." />
                <button type="submit">Search</button>
            </form>
        
            <Category
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {loading && <p>Loading...</p>}

            <div className="book-grid">
    {books.map((book) => {
        const isFavorite = favorites.some(
            (fav) => fav.key === book.key
        );

        return (
            <Books
                key={book.key}
                id={book.key}
                title={book.title}
                author={
                    book.authors?.map((a) => a.name).join(", ") ||
                    "Unknown Author"
                }
                cover_id={book.cover_id}
                favorite={isFavorite}
                onFavorite={() => toggleFavorite(book)}
            />
        );
    })}
</div>
                    
            </div>
    );
}

export default BookList;