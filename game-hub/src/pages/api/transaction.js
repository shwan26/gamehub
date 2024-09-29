import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/transactions.json');

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const data = fs.readFileSync(filePath);
      const transactions = JSON.parse(data);
      res.status(200).json(transactions);
      break;

    case 'POST':
      const newTransaction = req.body;
      const existingTransactions = JSON.parse(fs.readFileSync(filePath));
      existingTransactions.push(newTransaction);
      fs.writeFileSync(filePath, JSON.stringify(existingTransactions));
      res.status(201).json(newTransaction);
      break;

    case 'PUT':
      const updatedTransaction = req.body;
      let transactionsList = JSON.parse(fs.readFileSync(filePath));
      const index = transactionsList.findIndex(trans => trans.id === updatedTransaction.id);
      if (index > -1) {
        transactionsList[index] = updatedTransaction;
        fs.writeFileSync(filePath, JSON.stringify(transactionsList));
        res.status(200).json(updatedTransaction);
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
      break;

    case 'DELETE':
      const { id } = req.query;
      let updatedTransactions = JSON.parse(fs.readFileSync(filePath)).filter(trans => trans.id !== id);
      fs.writeFileSync(filePath, JSON.stringify(updatedTransactions));
      res.status(200).json({ message: 'Transaction deleted' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
