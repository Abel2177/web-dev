import React from 'react'

function Books({ id, title, author, cover_id }) {
    return (<div>
        <img src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={title} />
        <h2>{title}</h2>
        <p>{author}</p>
    </div>
    )
}

export default Books