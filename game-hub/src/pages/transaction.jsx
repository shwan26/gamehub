import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import games from '../data/games.json'; // Adjust the import path to your games data

const TransactionPage = () => {
  const { id } = useParams(); // Get the game ID from the URL
  const game = games.find((game) => game.id === parseInt(id)); // Find the game by ID
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // State to manage whether the order has been placed

  const placeOrder = () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert("Order placed successfully using " + paymentMethod.value);
    setIsOrderPlaced(true); // Mark order as placed
  };

  return (
    <div className="checkout-container">
      {isOrderPlaced ? (
        <div>
          <h1>Transaction</h1>
          <p>Thank you for your purchase!</p>
        </div>
      ) : (
        <>
          {game ? (
            <>
              <div className="left-section">
                <div className="section-title">Checkout for {game.title}</div>

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
                  <img src={game.image} alt={game.title} className="img-fluid" />
                  <div className="summary-item">
                    <label>Price:</label> ${game.price.toFixed(2)}
                  </div>
                  <div className="summary-item">
                    <label>Total:</label> ${game.price.toFixed(2)}
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
            </>
          ) : (
            <div className="text-center">Game not found.</div> // Display a message if the game doesn't exist
          )}
        </>
      )}
    </div>
  );
};

export default TransactionPage;
