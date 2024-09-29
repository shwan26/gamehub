import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import games from '../data/games.json';

const TransactionPage = () => {
  const { id } = useParams();
  const game = games.find(g => g.id === parseInt(id));
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); 

  const placeOrder = async () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) return alert("Please select a payment method.");

    alert(`Order placed successfully using ${paymentMethod.value}`);
    setIsOrderPlaced(true);

    // Simulating user purchase update
    await fetch('/api/users/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, purchases: [game.id] }), // Assuming user ID is 1
    });
  };

  return (
    <div>
      {isOrderPlaced ? (
        <div>
          <h1>Transaction</h1>
          <p>Thank you for your purchase!</p>
        </div>
      ) : (
        game ? (
          <div>
            <h1>{game.title}</h1>
            <div>
              <input type="radio" id="credit-card" name="payment" value="credit-card" />
              <label htmlFor="credit-card">Credit Card</label>
              <input type="radio" id="paypal" name="payment" value="paypal" />
              <label htmlFor="paypal">PayPal</label>
              <button onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        ) : (
          <div>Game not found.</div>
        )
      )}
    </div>
  );
};

export default TransactionPage;
