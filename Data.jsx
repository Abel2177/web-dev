import React, { useEffect, useState } from "react";
import Books from "../src/Components/Books";
import Category from "../src/Components/Category";
import "../src/App.css";
function BookList() {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("bestsellers");
    const [loading, setLoading] = useState(false);
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


    return (
        <div>

            <Category
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {loading && <p>Loading...</p>}

            <div className="book-grid">
                {books.map((book) => {
                    const coverUrl = book.cover_id
                        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                        : "https://via.placeholder.com/150x220?text=No+Cover";

                    return (
                        <div key={book.key}>
                            <h3 className="book-title">{book.title}</h3>

                            <img src={coverUrl} alt={book.title} />
                            <p>
                                {book.authors?.map((a) => a.name).join(", ") || "Unknown Author"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BookList;