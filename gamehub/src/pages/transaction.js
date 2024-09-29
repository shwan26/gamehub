import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext'; // Adjust based on your context path

const Transaction = () => {
  const router = useRouter();
  const { cart = [] } = useCart(); // Use default empty array if cart is undefined
  const [user, setUser] = useState(null);
  const userId = 1; // Example user ID; adjust as necessary

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUserData();
  }, [userId]);

  const handleConfirmPurchase = async () => {
    if (!user) {
      alert('User data is not loaded.'); 
      return;
    }

    // Step 1: Update user library
    const updatedLibrary = [...new Set([...user.library, ...cart])]; // Add cart items to library without duplicates

    // Update users.json
    const userUpdateResponse = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, library: updatedLibrary, cart: [] }), // Clear the cart after purchase
    });

    if (!userUpdateResponse.ok) {
      const errorMessage = await userUpdateResponse.text();
      alert(`Failed to update user library: ${errorMessage}`);
      return;
    }

    // Step 2: Prepare transaction data
    const transactionData = {
      userId: userId,
      gameIds: cart, // Include all game IDs from the cart
      date: new Date().toISOString(),
    };

    // Update transactions.json
    const transactionResponse = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!transactionResponse.ok) {
      const errorMessage = await transactionResponse.text();
      alert(`Failed to record transaction: ${errorMessage}`);
      return;
    }

    alert('Purchase successful!');
    router.push('/library'); // Redirect to library page
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Transaction Page</h1>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(gameId => (
          <div key={gameId}>
            <p>Game ID: {gameId}</p>
          </div>
        ))
      )}
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
    </div>
  );
};

export default Transaction;
