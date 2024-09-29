import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const Transaction = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactionGames, setTransactionGames] = useState([]); // Array to store games for the transaction

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
      const gamesNotInLibrary = transactionGames.filter(game => 
        !user.library.includes(game.id)
      );

      if (gamesNotInLibrary.length === 0) {
        alert("You already own all these games.");
        return;
      }

      // Update user's library with games not in library
      const updatedLibrary = [...user.library, ...gamesNotInLibrary.map(game => game.id)];

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
          gameIds: gamesNotInLibrary.map(game => game.id),
          date: new Date().toISOString(),
        }),
      });

      // Remove games from user's cart
      const updatedCart = user.cart.filter(gameId => 
        !transactionGames.map(game => game.id).includes(gameId)
      );

      await fetch(`/api/users/1`, { // Adjust the user ID as needed
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart }),
      });

      alert("Payment confirmed! Games have been added to your library.");
      router.push('/library'); // Redirect to library page after confirmation
    }
  };

  if (!user) return <p>Loading...</p>; // Loading state

  return (
    <div>
  <Header />
  <h1 className="text-center mb-4">Confirm Your Transaction</h1>

  <div className="card">
    <div className="card-body">
      <h2 className="card-title">Games:</h2>
      <ul className="list-group mb-3">
        {transactionGames.map(game => (
          <li key={game.id} className="list-group-item d-flex justify-content-between align-items-center">
            {game.title}
            <span className="badge badge-primary badge-pill">${game.price}</span>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button 
          onClick={handleConfirmPayment} 
          className="btn btn-success btn-lg w-100"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Transaction;
