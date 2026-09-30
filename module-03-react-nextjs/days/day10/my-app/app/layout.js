import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover delicious food with Addis Eats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1>Addis Eats</h1>

          <nav>
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/checkout">Checkout</a>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}