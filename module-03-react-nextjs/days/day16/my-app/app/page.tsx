export default function HomePage() {
  return ( 
<main className="mx-auto max-w-5xl px-6 py-16"> 
  <section className="rounded-2xl bg-orange-100 px-8 py-14 text-center sm:px-12"> 
    <p className="mb-3 font-semibold uppercase tracking-widest text-orange-700">
      Welcome to Addis Eats </p>

    <h1 className="mb-5 text-4xl font-extrabold sm:text-6xl">
      A Taste of Ethiopia
    </h1>

    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
      Discover traditional Ethiopian favorites, from spicy Doro Wot
      to delicious Tibs and comforting Shiro.
    </p>

    <a
      href="/menu"
      className="inline-block rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700"
    >
      Explore Our Menu
    </a>
  </section>

  <section className="py-12 text-center">
    <h2 className="mb-4 text-2xl font-bold">Fresh Flavors, Local Favorites</h2>
    <p className="text-gray-600">
      Find your favorite dish and get ready for a delicious meal.
    </p>
  </section>
</main>

);
}