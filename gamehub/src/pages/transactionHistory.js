import { useEffect, useState } from 'react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transaction History</h1>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <h3>Transaction ID: {transaction.id}</h3>
              <p>User ID: {transaction.userId}</p>
              <p>Date: {new Date(transaction.date).toLocaleString()}</p>
              <p>Games Purchased:</p>
              <ul>
                {transaction.gameIds.map(gameId => (
                  <li key={gameId}>Game ID: {gameId}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
