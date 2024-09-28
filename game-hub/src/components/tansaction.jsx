import React from 'react';

function Checkout() {
  const placeOrder = () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert("Order placed successfully using " + paymentMethod.value);
  };

  return (
    <div className="checkout-container">
      <div className="left-section">
        <div className="section-title">Checkout</div>

        <div className="payment-method">
          <input type="radio" id="epic-rewards" name="payment" value="epic-rewards" />
          <label htmlFor="epic-rewards">GameHub Discount $0.00</label>
        </div>

        <div className="section-title">Other Payment Methods</div>

        <div className="payment-method">
          <input type="radio" id="credit-card" name="payment" value="credit-card" />
          <label htmlFor="credit-card">Credit Card</label>
        </div>

        <div className="payment-method">
          <input type="radio" id="paypal" name="payment" value="paypal" />
          <label htmlFor="paypal">PayPal</label>
        </div>
      </div>

      <div className="right-section">
        <div className="order-summary">
          <img src="https://image.api.playstation.com/vulcan/ap/rnd/202405/2117/bd406f42e9352fdb398efcf21a4ffe575b2306ac40089d21.png" alt="Black Myth: WuKong" />
          <div className="summary-item">
            <label>Price:</label> $99.99
          </div>
          <div className="summary-item">
            <label>Total:</label> $99.99
          </div>
          <div className="summary-item">
            <label>Get $5.00 of GameHub Discount with this purchase.</label>
          </div>

          <input type="text" className="creator-code" placeholder="Enter creator code" />

          <div className="checkbox-label">
            <input type="checkbox" id="share-email" />
            <label htmlFor="share-email">Click here to agree to share your email with Electronic Arts.</label>
          </div>

          <button className="place-order" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default transaction;