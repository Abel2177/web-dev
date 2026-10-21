import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* <h1>Addis Eats</h1> */}
      <h2>Welcome to Addis Eats</h2>
      <p>Delicious Ethiopian food, delivered to you.</p>


      <nav>
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}