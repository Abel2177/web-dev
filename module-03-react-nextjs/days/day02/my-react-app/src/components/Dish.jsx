import PropTypes from "prop-types";
export default function Dish({ id, name, price, category, isSpicy, currency="etb"}) {
  return (
    <div>
        <div className="card">
      <h2> {name}</h2>
      <p>{price} {currency}</p>
      <p> {id}</p>
      <p>{category}</p>
      <p>{isSpicy &&"spicy" }</p>
      </div>
    </div>
  )
}
 Dish.propTypes = {
  name:PropTypes.string.isRequired,
  price:PropTypes.number.isRequired,
  isSpicy:PropTypes.bool,
  catatgory:PropTypes.string.isRequired,
 };