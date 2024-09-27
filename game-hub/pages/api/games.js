// pages/api/games.js
let games = [
    { id: 1, title: "Black Myth: Wukong", imgSrc: "https://image.api.playstation.com/vulcan/ap/rnd/202405/2117/bd406f42e9352fdb398efcf21a4ffe575b2306ac40089d21.png" },
    { id: 2, title: "Shadow of War", imgSrc: "https://image.api.playstation.com/cdn/UP1018/CUSA01939_00/RqmfaWBQC0YplGns91rFEKYOkX9CA3OqpIXYyq6T2K0Kh0X2od1FEaZnBfy9h7s4.png" },
    { id: 3, title: "Witcher 3: Wild Hunt", imgSrc: "https://i.redd.it/what-is-difference-between-goty-and-complete-edition-v0-9qoaqnxvdjw91.jpg?width=1024&format=pjpg&auto=webp&s=93112a3803887c2210f766fbe63c59aa41483d43" },
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(games);
    } else if (req.method === 'POST') {
        const newGame = { id: Date.now(), ...req.body };
        games.push(newGame);
        res.status(201).json(newGame);
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        games = games.filter(game => game.id !== parseInt(id));
        res.status(204).end();
    }
}
