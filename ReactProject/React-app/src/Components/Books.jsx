import React from "react";
import { useContext } from "react";
import { CartContext } from "../App";
function Books({ id, title, author, cover_id, favorite, onFavorite }) {
   
    const {cart, dispatch} = useContext(CartContext);
   
    return (
        <div>
            <img
                src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`}
                alt={title}
            />

            <h2>{title}</h2>

            <p>{author}</p>

            <button onClick={onFavorite}>
                {favorite ? "❤️ Remove Favorite" : "♡ Add Favorite"}
            </button>
            <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id, title, author, cover_id } })}>
                Add to Cart
            </button>
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { id } })}>
                Remove from Cart
            </button>
        </div>
    );
}



export default Books;