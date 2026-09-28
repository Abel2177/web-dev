import Link from "next/link";

function DishList({ dishes }) {
  return (
    <div>
      {dishes.map((food) => (
        <div key={food.id}>
          <h2>{food.name}</h2>

          <p>{food.description}</p>

          <p>Price: ${food.price}</p>

          <p>Category: {food.category}</p>

          <Link href={`/menu/${food.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DishList;