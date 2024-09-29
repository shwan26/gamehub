import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

export default function handler(req, res) {
  const { id } = req.query;

  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const userIndex = usersData.findIndex(user => user.id === parseInt(id));

  switch (req.method) {
    case 'GET':
      if (userIndex >= 0) {
        res.status(200).json(usersData[userIndex]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      break;

    case 'PUT':
      if (userIndex >= 0) {
        usersData[userIndex] = { ...usersData[userIndex], ...req.body };
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
        res.status(200).json(usersData[userIndex]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      break;

    case 'DELETE':
      if (userIndex >= 0) {
        const deletedUser = usersData.splice(userIndex, 1);
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
        res.status(200).json(deletedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// done