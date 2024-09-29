# GameHub for Full-Stack CRUD App.

6530187 Shwan Myat Nay Chi 

6530181 Min Thuka 

## Getting Started


# CRUD operation for User Data Model
```bash
# Get All Users
curl -X GET http://localhost:3000/api/users

# Create a New User
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"id": 3, "name": "John Doe", "cart": [], "library": []}'

# Get User by ID
curl -X GET http://localhost:3000/api/users/3

# Update User
curl -X PUT http://localhost:3000/api/users/3 -H "Content-Type: application/json" -d '{"id": 3, "name": "Jane Doe", "cart": [], "library": []}'

# Delete User
curl -X DELETE http://localhost:3000/api/users/3
```

# CRUD operation for Transactions Data Model
```bash
## Get All Transactions
curl -X GET http://localhost:3000/api/transactions```

## Create a New Transaction
curl -X POST http://localhost:3000/api/transactions -H "Content-Type: application/json" -d '{"id": 4, "userId": 1, "gameId": 1, "date": "2024-09-29", "amount": 19.99}'

## Get Transaction by ID
curl -X GET http://localhost:3000/api/transactions/4

## Delete Transaction
curl -X DELETE http://localhost:3000/api/transactions/4
```

# CRUD operation for Games Data Model
```bash
## Get All Games
curl -X GET http://localhost:3000/api/games

## Create a New Game
curl -X POST http://localhost:3000/api/games -H "Content-Type: application/json" -d '{"id": 13, "title": "Sample Game", "description": "This is a sample game description.", "price": 29.99}'

## Get Game by ID
curl -X GET http://localhost:3000/api/games/13

## Update Game
curl -X PUT http://localhost:3000/api/games/13 -H "Content-Type: application/json" -d '{"id": 13, "title": "Updated Sample Game", "description": "This is an updated sample game description.", "price": 24.99}'

# Delete Game
curl -X DELETE http://localhost:3000/api/games/13
```

