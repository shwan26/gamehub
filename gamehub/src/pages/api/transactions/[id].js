// src/pages/api/transactions/[id].js

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/transactions.json');

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Read the existing transactions
      const transactions = JSON.parse(fs.readFileSync(filePath));
      const transaction = transactions.find(t => t.id === parseInt(id));

      if (transaction) {
        return res.status(200).json(transaction);
      } else {
        return res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error reading transactions data', error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const newTransaction = req.body;

      // Read existing transactions
      const transactions = JSON.parse(fs.readFileSync(filePath));

      // Assign a new ID to the transaction
      const newId = transactions.length ? Math.max(transactions.map(t => t.id)) + 1 : 1;
      const transactionToAdd = { ...newTransaction, id: newId };

      // Add the new transaction
      transactions.push(transactionToAdd);

      // Write the updated transactions.json file back to the file system
      fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));

      return res.status(201).json(transactionToAdd);
    } catch (error) {
      return res.status(500).json({ message: 'Error adding new transaction', error: error.message });
    }
  }

  // Handle other HTTP methods if necessary
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
