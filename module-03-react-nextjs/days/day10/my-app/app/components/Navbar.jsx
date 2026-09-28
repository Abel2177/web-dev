"use client";

import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  function goToMenu() {
    router.push("/menu");
  }

  return (
    <button onClick={goToMenu}>
      Go To Menu
    </button>
  );
}