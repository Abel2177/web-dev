

export default function Dish({name, price}) {
  return (
    <div>
        <div className="card">
      <h2>{name}</h2>
      <h2>{price}</h2>
      </div>
    </div>
  )
}
