import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalCount } =
    useCart();

  const deliveryFee = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-view">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>You haven&apos;t added any delicious food items to your cart yet.</p>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Explore Menu &amp; Start Ordering 🍲
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-description">
          Review your selected items ({totalCount} {totalCount === 1 ? 'item' : 'items'}) before proceeding to checkout.
        </p>
      </div>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items-column">
          <div className="cart-items-header">
            <span>Dish</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="cart-item-img"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=60';
                      }}
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">${Number(item.price).toFixed(2)} each</p>
                    </div>
                  </div>

                  <div className="cart-qty-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    ${itemTotal.toFixed(2)}
                  </div>

                  <div className="cart-item-remove">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-actions-bar">
            <Link to="/menu" className="btn btn-outline">
              ← Continue Shopping
            </Link>
            <button
              type="button"
              className="btn btn-text text-danger"
              onClick={clearCart}
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="cart-summary-column">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Items Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Estimated Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <strong className="text-success">FREE</strong>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="free-shipping-note">
                💡 Tip: Add ${(50 - subtotal).toFixed(2)} more for free delivery!
              </p>
            )}

            <div className="summary-row">
              <span>Taxes &amp; Fees (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total to Pay</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-block btn-lg mt-4">
              Proceed to Checkout →
            </Link>

            <div className="security-note">
              🔒 Safe &amp; Secure Checkout Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;