import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h2>Welcome to Addis Eats</h2>

      <p>
        Discover delicious Ethiopian food and order your favorite dishes.
      </p>

      <Link to="/menu">View Menu</Link>
    </section>
  );
}

export default Home;