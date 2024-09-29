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

# Structure
`/gamehub
├── /src
│   ├── /pages
│   │   ├── /api
│   │   │   ├── /games
│   │   │   │   ├── index.js
│   │   │   │   └── [id].js
│   │   │   ├── /users
│   │   │   │   ├── index.js
│   │   │   │   └── [id].js
│   │   │   ├── /transactions
│   │   │   │   ├── index.js
│   │   │   │   └── [id].js
│   │   ├── index.js (Store/Homepage)
│   │   ├── /library.js
│   │   ├── /cart.js
│   │   ├── /profile.js
│   │   ├── /_app.js
│   │   ├── /transaction.js
│   │   └── /game/[id].js (Game Detail Page)
│   ├── /components
│   │   ├── GameCard.js
│   │   ├── Cart.js
│   │   └── Header.js
│   ├── /data
│   │   ├── games.json
│   │   ├── users.json
│   │   └── transactions.json
├── package.json
└── ...`
