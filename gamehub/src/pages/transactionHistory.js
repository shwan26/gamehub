import { useEffect, useState } from 'react';
import Header from '@/components/Header';

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
    <Header /> {/* Add the Header component here */}
    <h1 className="text-center mb-4">Transaction History</h1>
    {transactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
    ) : (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
            <ul className="list-group">
                {transactions.map(transaction => (
                <li key={transaction.id} className="list-group-item mb-4">
                    <h3 className="mb-3">Transaction ID: {transaction.id}</h3>
                    <p><strong>User ID:</strong> {transaction.userId}</p>
                    <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
                    <p><strong>Games Purchased:</strong></p>
                    <ul className="list-unstyled">
                    {transaction.gameIds.map(gameId => (
                        <li key={gameId} className="mb-2">
                        <span className="badge bg-primary">Game ID: {gameId}</span>
                        </li>
                    ))}
                    </ul>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    )}
    </div>

  );
};

export default TransactionHistory;
