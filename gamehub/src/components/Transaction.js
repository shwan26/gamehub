import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext'; // Assuming you have a CartContext for managing the cart

const Transaction = () => {
  const router = useRouter();
  const { cart } = useCart(); // Get the cart from context
  const [user, setUser] = useState(null);
  const [transactionDate, setTransactionDate] = useState('');

  useEffect(() => {
    // Fetch the user data based on the user ID (replace with actual logic)
    const fetchUserData = async () => {
      const userId = 1; // Example user ID; adjust as needed
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleConfirmPurchase = async () => {
    const userId = 1; // Example user ID; adjust based on your logic
    const transactionData = {
      userId: userId,
      gameIds: cart,
      date: new Date().toISOString(),
    };

    // Update the users.json to add games to the library
    const updatedLibrary = [...user.library, ...cart];
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, library: updatedLibrary, cart: [] }), // Clear the cart
    });

    // Update the transactions.json with the new transaction
    await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

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
            <p>Game ID: {gameId}</p> {/* Fetch game details as needed */}
          </div>
        ))
      )}
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
    </div>
  );
};

export default Transaction;
