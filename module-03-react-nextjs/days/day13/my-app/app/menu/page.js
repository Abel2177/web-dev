import Link from "next/link";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import FilterShell from "./FilterShell";
import MenuNavigation from "./MenuNavigation";

async function getDishes() {
  return [
    { id: "1", name: "Doro Wot" },
    { id: "2", name: "Tibs" },
    { id: "3", name: "Shiro" },
  ];
}

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main>
      <h1>Menu</h1>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>

      <CategoryBar />
        <FilterShell >
         <DishList dishes={dishes} />
        </FilterShell>
      <MenuNavigation />
    </main>
  );
}