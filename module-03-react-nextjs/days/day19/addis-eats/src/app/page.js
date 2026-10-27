import Link from "next/link";

// Home page: title falls back to the root "default" — "Addis Eats — Ethiopian food delivery in Addis Ababa"
export const metadata = {
  openGraph: {
    url: "/",
    title: "Addis Eats — Ethiopian food delivery in Addis Ababa",
    description:
      "Order injera platters, tibs, kitfo and more from neighbourhood kitchens in Addis Ababa. Fast, fresh, and delivered to your door.",
  },
};

export default function Home() {
  return <main className="hero"><p className="eyebrow">Addis Ababa, Ethiopia</p><h1>Every craving deserves a little spice.</h1><p>Order comforting Ethiopian classics from neighbourhood kitchens you love.</p><Link className="button" href="/menu">Explore Menu</Link></main>;
}
