"use client";

import { useRouter } from "next/navigation";

export default function MenuNavigation() {
  const router = useRouter();
  
  function goToCart(){
    router.push("/cart");
  }

  function goToCheckout(){
    router.push("/checkout");
  }

  return (
    <div>
      <button onClick={goToCart}>Go to Cart</button>
      <br/>
      <button onClick={goToCheckout}>Go to Checkout</button>
    </div>
  );
}