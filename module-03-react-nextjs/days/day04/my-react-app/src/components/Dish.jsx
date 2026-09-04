import { useState } from "react";
// import PropTypes from "prop-types";
import Card from "./Card";
function Dish({
  name,
  price,
  spicy = false,
  currency = "ETB",
  onAdd,
}) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
    onAdd(price);
  }

  return (
    <div className="dish">
      <Card>
        <h3>
          {name} Quantity: {count}
        </h3>

        <p>
          {price} {currency}
        </p>

        <p>{spicy && <em>Spicy</em>}</p>

        <button onClick={handleAdd}>Add</button>
      </Card>
    </div>
  );
}

// Dish.propTypes = {
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   spicy: PropTypes.bool,
//   currency: PropTypes.string,
//   onAdd: PropTypes.func.isRequired,
// };

export default Dish;