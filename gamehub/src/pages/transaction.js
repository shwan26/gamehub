import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Transaction = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactionGames, setTransactionGames] = useState([]); // Array to store games for the transaction
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/1`); // Adjust the user ID as needed
      const data = await response.json();
      setUser(data);
      fetchTransactionGames(data.cart); // Fetch games in the user's cart
    };

    const fetchTransactionGames = async (cartIds) => {
      const responses = await Promise.all(
        cartIds.map(id => fetch(`/api/games/${id}`))
      );
      const gamesData = await Promise.all(responses.map(res => res.json()));
      setTransactionGames(gamesData);
    };

    fetchUserData();
  }, []);

  const handleConfirmPayment = async () => {
    if (user) {
      // Check if the games are already in the user's library
      const gamesAlreadyInLibrary = transactionGames.filter(game => 
        user.library.includes(game.id)
      );

      if (gamesAlreadyInLibrary.length > 0) {
        alert("One or more games are already in your library.");
        return;
      }

      // Update user's library
      const updatedLibrary = [...user.library, ...transactionGames.map(game => game.id)];

      // Update users.json
      await fetch(`/api/users/1`, { // Adjust the user ID as needed
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ library: updatedLibrary }),
      });

      // Add transaction to transactions.json
      await fetch(`/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id, // Assuming user object has an id
          gameIds: transactionGames.map(game => game.id),
          date: new Date().toISOString(),
        }),
      });

      setTransactionSuccess(true);
      alert("Payment confirmed! Games have been added to your library.");
      router.push('/library'); // Redirect to library page after confirmation
    }
  };

  if (!user) return <p>Loading...</p>; // Loading state

  return (
    <div>
      <h1>Confirm Your Transaction</h1>
      <h2>Games:</h2>
      <ul>
        {transactionGames.map(game => (
          <li key={game.id}>{game.title} - ${game.price}</li>
        ))}
      </ul>
      <button onClick={handleConfirmPayment}>Confirm Payment</button>
    </div>
  );
};

export default Transaction;
