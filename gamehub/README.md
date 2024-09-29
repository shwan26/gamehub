This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# CRUD operation for User Data Model
## Get All Users
`curl -X GET http://localhost:3000/api/users`

## Create a New User
`curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"id": 3, "name": "John Doe", "cart": [], "library": []}'`

## Get User by ID
`curl -X GET http://localhost:3000/api/users/3`

## Update User
`curl -X PUT http://localhost:3000/api/users/3 -H "Content-Type: application/json" -d '{"id": 3, "name": "Jane Doe", "cart": [], "library": []}'`

## Delete User
`curl -X DELETE http://localhost:3000/api/users/3`

# CRUD operation for User Data Model
## Get All Transactions
curl -X GET http://localhost:3000/api/transactions

## Create a New Transaction
curl -X POST http://localhost:3000/api/transactions -H "Content-Type: application/json" -d '{"id": 1, "userId": 1, "gameId": 1, "date": "2024-09-29", "amount": 19.99}'

## Get Transaction by ID
curl -X GET http://localhost:3000/api/transactions/1

## Delete Transaction
curl -X DELETE http://localhost:3000/api/transactions/1

# CRUD operation for User Data Model
## Get All Games
curl -X GET http://localhost:3000/api/games

## Create a New Game
curl -X POST http://localhost:3000/api/games -H "Content-Type: application/json" -d '{"id": 1, "title": "Sample Game", "description": "This is a sample game description.", "price": 29.99}'

## Get Game by ID
curl -X GET http://localhost:3000/api/games/1

## Update Game
curl -X PUT http://localhost:3000/api/games/1 -H "Content-Type: application/json" -d '{"id": 1, "title": "Updated Sample Game", "description": "This is an updated sample game description.", "price": 24.99}'

# Delete Game
curl -X DELETE http://localhost:3000/api/games/1

