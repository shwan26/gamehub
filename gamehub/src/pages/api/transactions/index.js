import fs from 'fs';
import path from 'path';

const transactionsFilePath = path.join(process.cwd(), 'src/data/transactions.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Add new transaction
    const newTransaction = req.body;

    // Read existing transactions
    const data = JSON.parse(fs.readFileSync(transactionsFilePath, 'utf8'));
    
    // Add new transaction
    data.push(newTransaction);

    // Write updated transactions back to file
    fs.writeFileSync(transactionsFilePath, JSON.stringify(data, null, 2));
    
    return res.status(201).json(newTransaction);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
