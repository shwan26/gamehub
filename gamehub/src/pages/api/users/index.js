import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/users.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = JSON.parse(fs.readFileSync(filePath));
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const newUser = req.body;
    const users = JSON.parse(fs.readFileSync(filePath));
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users));
    res.status(201).json(newUser);
  }
}
