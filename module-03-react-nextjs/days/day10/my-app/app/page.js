import Navbar from "./components/Navbar";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>This is the home page of your Next.js application.</p>
     <Link href="/menu">
  View Menu
</Link>
      <Navbar />
    </main>
  );
}