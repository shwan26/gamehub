# Structure
/src
├── /pages
│   ├── /api
│   |   ├── game.js
│   |   ├── user.js
│   |   ├── transaction.js
│   ├── /game
│   |   ├── [id].jsx
│   ├── /transaction
│   |   ├── [id].jsx
│   ├── cart.jsx
│   ├── library.jsx
│   ├── transaction.jsx
│   ├── profile.jsx
│   ├── _app.jsx
│   └── index.jsx
├── /components
│   ├── Header.jsx
│   ├── GameDetail.jsx
│   └── GameCard.jsx
├── /data
│   ├── games.json
│   ├── users.json
│   └── transactions.json
└── main.jsx

# sample CRUD using curl for game

### 1. Create (POST)

```bash
curl -X POST http://localhost:3000/api/game -H "Content-Type: application/json" -d '{
    "id": 6,
    "title": "New Game",
    "description": "A new game description.",
    "price": 49.99,
    "image": "https://example.com/image.png"
}'
```

### 2. Read (GET)

#### Get All Games
```bash
curl -X GET "http://localhost:3000/api/game"
```

#### Get a Specific Game by ID

```bash
curl -X GET "http://localhost:3000/api/game?id=6"
```


### 3. Update (PUT or PATCH) (error)

```bash
curl -X PATCH http://localhost:3000/api/game/1 -H "Content-Type: application/json" -d '{
    "title": "Updated Game Title",
    "price": 39.99
}'
```

### 4. Delete (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/game -H "Content-Type: application/json" -d '{
  "id": 6
}'
```
