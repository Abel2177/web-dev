import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();

  const deliveryFee = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + deliveryFee + tax;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subcity: 'Bole',
    address: '',
    notes: '',
    paymentMethod: 'telebirr',
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const subcities = [
    'Bole',
    'Kazanchis',
    'Sarbet',
    'Piassa',
    'Meganagna',
    'CMC',
    'Old Airport',
    'Gerji',
    'Kirkos',
    'Yeka',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill out all required fields (Name, Phone, and Address).');
      return;
    }

    const orderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderId,
      items: [...cartItems],
      total: grandTotal,
      customer: { ...formData },
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedOrder(orderDetails);
    clearCart();
    setOrderSubmitted(true);
  };

  if (orderSubmitted && confirmedOrder) {
    return (
      <div className="checkout-page">
        <div className="order-success-card">
          <div className="success-icon">🎉</div>
          <span className="success-tag">Order Confirmed</span>
          <h1 className="success-title">Thank You For Your Order!</h1>
          <p className="success-desc">
            Your delicious meal is now being prepared. Our courier will notify you as soon as they are on the way.
          </p>

          <div className="order-details-box">
            <div className="order-detail-item">
              <span className="detail-label">Order Number:</span>
              <strong className="detail-value order-id">{confirmedOrder.orderId}</strong>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Estimated Delivery:</span>
              <strong className="detail-value text-success">30 – 40 mins</strong>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Delivery To:</span>
              <span className="detail-value">
                {confirmedOrder.customer.address}, {confirmedOrder.customer.subcity}
              </span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value uppercase">
                {confirmedOrder.customer.paymentMethod}
              </span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Total Amount:</span>
              <strong className="detail-value">${confirmedOrder.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="order-items-preview">
            <h3>Dishes Ordered ({confirmedOrder.items.length})</h3>
            <div className="ordered-items-list">
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="ordered-item-row">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="success-actions">
            <Link to="/menu" className="btn btn-primary btn-lg">
              Order Something Else 🍽️
            </Link>
            <Link to="/" className="btn btn-outline btn-lg">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart-view">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>You cannot checkout with an empty cart. Please select items from our menu first.</p>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Browse Menu 🍲
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h1 className="page-title">Complete Your Order</h1>
        <p className="page-description">
          Enter your delivery details and choose a convenient payment method.
        </p>
      </div>

      <div className="checkout-layout">
        {/* Checkout Form */}
        <div className="checkout-form-column">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-card">
              <h2 className="form-card-title">1. Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Abel Kebede"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. +251 91 234 5678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-card">
              <h2 className="form-card-title">2. Delivery Address (Addis Ababa)</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subcity">Sub-city / Neighborhood *</label>
                  <select
                    id="subcity"
                    name="subcity"
                    value={formData.subcity}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {subcities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Street / Building / House No. *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="e.g. Atlas, Behind Edna Mall, Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="notes">Delivery Instructions (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="2"
                  placeholder="e.g. Ring bell upon arrival or leave with guard"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-textarea"
                ></textarea>
              </div>
            </div>

            <div className="form-card">
              <h2 className="form-card-title">3. Payment Method</h2>
              <div className="payment-options">
                <label
                  className={`payment-option ${formData.paymentMethod === 'telebirr' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={formData.paymentMethod === 'telebirr'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-title">⚡ Telebirr</span>
                    <span className="payment-desc">Instant mobile payment on confirmation</span>
                  </div>
                </label>

                <label
                  className={`payment-option ${formData.paymentMethod === 'cash' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-title">💵 Cash on Delivery</span>
                    <span className="payment-desc">Pay cash when courier delivers the food</span>
                  </div>
                </label>

                <label
                  className={`payment-option ${formData.paymentMethod === 'cbe' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cbe"
                    checked={formData.paymentMethod === 'cbe'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-title">🏦 CBE Birr / Bank</span>
                    <span className="payment-desc">Commercial Bank of Ethiopia transfer</span>
                  </div>
                </label>

                <label
                  className={`payment-option ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <span className="payment-title">💳 Credit / Debit Card</span>
                    <span className="payment-desc">Visa, Mastercard</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg submit-order-btn">
              Place Order (${grandTotal.toFixed(2)}) 🚀
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary-column">
          <div className="summary-card">
            <h2 className="summary-title">Order Overview</h2>

            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div className="checkout-item-meta">
                    <span className="checkout-item-title">{item.name}</span>
                    <span className="checkout-item-sub">Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Taxes &amp; Service</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total to Pay</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;