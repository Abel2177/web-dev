
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Discover delicious Ethiopian food.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-orange-50 text-gray-900">
        <Providers>
          <header className="bg-orange-600 px-6 py-5 text-white shadow-md">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold">Addis Eats</h1>

              <nav className="flex gap-5 font-medium">
                <a href="/">Home</a>
                <a href="/menu">Menu</a>
                <a href="/cart">Cart</a>
                <a href="/checkout">Checkout</a>
              </nav>
            </div>
          </header>

          {children}

          <footer className="mt-12 bg-gray-900 px-6 py-5 text-center text-white">
            <p>© 2026 Addis Eats. Ethiopian food, made with love.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
