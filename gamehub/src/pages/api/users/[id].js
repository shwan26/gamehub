// src/pages/api/users/[id].js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

  if (req.method === 'GET') {
    try {
      // Read the users.json file
      const usersData = fs.readFileSync(usersFilePath);
      const users = JSON.parse(usersData);
      const user = users.find(user => user.id === parseInt(id));

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error reading user data', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      // Read the users.json file
      const usersData = fs.readFileSync(usersFilePath);
      const users = JSON.parse(usersData);

      // Find the user by id
      const userIndex = users.findIndex(user => user.id === parseInt(id));
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user data with the data from the request body
      users[userIndex] = { ...users[userIndex], ...req.body };

      // Write the updated users.json file back to the file system
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

      return res.status(200).json(users[userIndex]);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user data', error: error.message });
    }
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
