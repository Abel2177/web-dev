import useFetch from "../hooks/useFetch";

function FeaturedDishes() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading featured dishes...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Featured Dishes</h2>

      {data.slice(0, 2).map((dish) => (
        <p key={dish.id}>
          {dish.name} - {dish.price} ETB
        </p>
      ))}
    </div>
  );
}

export default FeaturedDishes;