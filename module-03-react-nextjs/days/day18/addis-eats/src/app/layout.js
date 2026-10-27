import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { getSession } from "@/lib/session";
import SignOutButton from "./SignOutButton";

// next/font: self-hosted Inter — no external font request, zero CLS from FOUT.
// The variable allows Tailwind / CSS custom-property access if needed later.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const dynamic = "force-dynamic";

export const metadata = { title: "Addis Eats", description: "Fresh Ethiopian favourites, delivered in Addis Ababa." };

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <header className="site-header">
            <Link className="brand" href="/">Addis Eats</Link>
            <nav aria-label="Main navigation">
              <Link href="/menu">Menu</Link>
              <Link href="/checkout">Checkout</Link>
              {session?.role === "staff" && <Link href="/kitchen">Kitchen</Link>}
              {session ? (
                <>
                  <span className="nav-user">👤 {session.name}</span>
                  <SignOutButton />
                </>
              ) : (
                <Link href="/signin">Sign In</Link>
              )}
            </nav>
          </header>
          {children}
          <footer className="site-footer">© 2026 Addis Eats · Made with Ethiopian flavour</footer>
        </Providers>

        {/*
          Third-party analytics loaded with strategy="lazyOnload":
          Next.js defers this script until after the page is fully hydrated
          and the browser is idle — it never blocks LCP, FID, or INP.
        */}
        
      </body>
    </html>
  );
}
