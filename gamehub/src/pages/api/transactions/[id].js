import fs from 'fs';
import path from 'path';

const transactionsFilePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');

export default function handler(req, res) {
  const { id } = req.query;

  const transactionsData = JSON.parse(fs.readFileSync(transactionsFilePath, 'utf8'));
  const transactionIndex = transactionsData.findIndex(transaction => transaction.id === parseInt(id));

  switch (req.method) {
    case 'GET':
      if (transactionIndex >= 0) {
        res.status(200).json(transactionsData[transactionIndex]);
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
      break;

    case 'PUT':
      if (transactionIndex >= 0) {
        transactionsData[transactionIndex] = { ...transactionsData[transactionIndex], ...req.body };
        fs.writeFileSync(transactionsFilePath, JSON.stringify(transactionsData, null, 2));
        res.status(200).json(transactionsData[transactionIndex]);
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
      break;

    case 'DELETE':
      if (transactionIndex >= 0) {
        const deletedTransaction = transactionsData.splice(transactionIndex, 1);
        fs.writeFileSync(transactionsFilePath, JSON.stringify(transactionsData, null, 2));
        res.status(200).json(deletedTransaction);
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
//done