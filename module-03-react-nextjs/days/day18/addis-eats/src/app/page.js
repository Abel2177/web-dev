import Link from "next/link";

export default function Home() {
  return <main className="hero"><p className="eyebrow">Addis Ababa, Ethiopia</p><h1>Every craving deserves a little spice.</h1><p>Order comforting Ethiopian classics from neighbourhood kitchens you love.</p><Link className="button" href="/menu">Explore Menu</Link></main>;
}
