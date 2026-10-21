export default function DishList({ dishes }) {
  return (
    <section>
      {dishes.map((dish) => (
        <article key={dish.id}>
          <h2>{dish.name}</h2>
          <p>Dish ID: {dish.id}</p>
        </article>
      ))}
    </section>
  );
}