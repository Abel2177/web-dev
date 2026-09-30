import Link from "next/link";
import MenuCounter from "./MenuCounter";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside>
        <h2>Categories</h2>

        <ul>
          <li>
            <Link href="/menu">All</Link>
          </li>

          <li>
            <Link href="/menu?category=Italian">
              Italian
            </Link>
          </li>

          <li>
            <Link href="/menu?category=American">
              American
            </Link>
          </li>

          <li>
            <Link href="/menu?category=Japanese">
              Japanese
            </Link>
          </li>
        </ul>

        <MenuCounter />
      </aside>

      <section>
        {children}
      </section>
    </div>
  );
}