"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../providers";

const initialDetails = { customerName: "", address: "", phone: "" };

export default function CheckoutForm({ locale }) {
  const { items, setItems } = useCart();
  const [details, setDetails] = useState(initialDetails);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  function updateQuantity(dishId, change) {
    setItems((currentItems) => currentItems.flatMap((item) => {
      if (item.dishId !== dishId) return [item];
      const quantity = item.quantity + change;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }

  async function submitOrder(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, items: items.map(({ dishId, quantity }) => ({ dishId, quantity })) }),
      });
      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || { form: ["We could not place your order. Please try again."] });
        return;
      }

      setConfirmation(result.order);
      setItems([]);
    } catch {
      setFieldErrors({ form: ["We could not reach the order service. Please try again."] });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <section className="checkout-box confirmation" aria-live="polite">
        <span className="eyebrow">Success</span>
        <h2>Order confirmed!</h2>
        <p>Thanks, {confirmation.customerName}. Your order reference is <code>{confirmation.id}</code>.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link className="button" href={`/orders/${confirmation.id}`}>
            Track Live Order Status (Polling) →
          </Link>
          <Link className="button secondary-btn" href="/menu">
            Order more dishes
          </Link>
        </div>
      </section>
    );
  }


  if (!items.length) {
    return <section className="checkout-box"><strong>Your cart is empty.</strong><p>Add dishes from the menu before checking out.</p><Link className="button" href="/menu">Browse the menu</Link></section>;
  }

  return <form className="checkout-form" onSubmit={submitOrder} noValidate>
    <section className="checkout-box"><strong>Your order</strong><p className="request-language">Request language: {locale}</p><ul className="cart-items">{items.map((item) => <li key={item.dishId}><span>{item.name}</span><span className="quantity-controls"><button type="button" onClick={() => updateQuantity(item.dishId, -1)} aria-label={`Remove one ${item.name}`}>−</button><span aria-label={`${item.quantity} ${item.name}`}>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.dishId, 1)} aria-label={`Add one ${item.name}`}>+</button></span></li>)}</ul></section>
    <section className="delivery-details"><h2>Delivery details</h2><label>Name<input name="customerName" value={details.customerName} onChange={(event) => setDetails({ ...details, customerName: event.target.value })} /></label>{fieldErrors.customerName && <p className="field-error">{fieldErrors.customerName[0]}</p>}<label>Delivery address<textarea name="address" value={details.address} onChange={(event) => setDetails({ ...details, address: event.target.value })} /></label>{fieldErrors.address && <p className="field-error">{fieldErrors.address[0]}</p>}<label>Phone number<input name="phone" type="tel" value={details.phone} onChange={(event) => setDetails({ ...details, phone: event.target.value })} /></label>{fieldErrors.phone && <p className="field-error">{fieldErrors.phone[0]}</p>}{fieldErrors.form && <p className="field-error">{fieldErrors.form[0]}</p>}<button className="add-to-cart" type="submit" disabled={isSubmitting}>{isSubmitting ? "Placing order…" : "Place order"}</button></section>
  </form>;
}
