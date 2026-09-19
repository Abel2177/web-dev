import { useState } from "react";
import { useCartStore } from "../store/cartStore";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const total = items.reduce(
    (sum, dish) => sum + Number(dish.price),
    0
  );

  function handlePhoneChange(event) {
    const value = event.target.value;

    setPhone(value);

    // Ethiopian phone number: 09xxxxxxxx or 07xxxxxxxx
    const phoneRegex = /^(09|07)\d{8}$/;

    if (value === "") {
      setPhoneError("Phone number is required.");
    } else if (!phoneRegex.test(value)) {
      setPhoneError(
        "Enter a valid Ethiopian phone number, e.g. 0912345678."
      );
    } else {
      setPhoneError("");
    }
  }

  function handleCheckout(event) {
    event.preventDefault();

    const phoneRegex = /^(09|07)\d{8}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError(
        "Enter a valid Ethiopian phone number, e.g. 0912345678."
      );
      return;
    }

    alert("Order placed successfully!");
    clear();
    setPhone("");
  }

  return (
    <section>
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h3>Order Summary</h3>

          {items.map((dish) => (
            <div key={dish.id}>
              <p>
                {dish.name} — {dish.price} ETB
              </p>
            </div>
          ))}

          <h3>Total: {total} ETB</h3>

          <form onSubmit={handleCheckout}>
            <input
              type="text"
              placeholder="Your name"
              required
            />

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="0912345678"
              maxLength="10"
              required
            />

            {phoneError && (
              <p>{phoneError}</p>
            )}

            <button type="submit">
              Place Order
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default Checkout;