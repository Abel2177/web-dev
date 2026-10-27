"use client";

import Link from "next/link";
import { useCart } from "./providers";

export default function CartBadge() {
  const { itemCount } = useCart();
  return <Link href="/checkout" aria-label={`Cart, ${itemCount} items`}>Cart ({itemCount})</Link>;
}
