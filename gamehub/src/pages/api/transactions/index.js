// src/pages/api/transactions/index.js

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/transactions.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Read the existing transactions
    const transactions = JSON.parse(fs.readFileSync(filePath));
    
    // Create a new transaction object
    const newTransaction = {
      id: transactions.length + 1, // Increment ID for the new transaction
      ...req.body, // Spread the transaction data from the request body
    };

    // Add the new transaction to the list
    transactions.push(newTransaction);

    // Write back the updated transactions to the file
    fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));

    // Return the created transaction
    return res.status(201).json(newTransaction);
  }

  // If not a POST request, set allowed methods and send 405
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
