import React, { useState } from 'react';
import { useRouter } from 'next/router';
import games from '../../data/games.json'; // Adjust the import path to your games data

const TransactionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const game = games.find((game) => game.id === parseInt(id));
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // State to manage whether the order has been placed

  const placeOrder = () => {
    alert("Order placed successfully!");
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
              <h1>Checkout for {game.title}</h1>
              {/* Payment method logic here */}
              <button onClick={placeOrder}>Place Order</button>
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
