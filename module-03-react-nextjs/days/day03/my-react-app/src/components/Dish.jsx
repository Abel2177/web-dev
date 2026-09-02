import React, { useState } from 'react'
import Card from './Card'


function Dish({ id,name, price, catagory, currency="ETB", isSpicy , onAdd, onItem}) {
  const [count, setCount]=useState(0);
  function addCount(){
    setCount(count+1)
  }
  
  return (
        <div className="cards">
    <Card>
      <h3>{name}-{count}</h3>
      <p className="price">{price} {currency}</p>
      <p className="category">{catagory}</p>
     <p> {isSpicy &&  'Spicy'}</p>
     <button onClick={()=>{onAdd(price); onItem(); addCount()}}>Add</button>
    
    </Card>
  </div>)
}





export default Dish