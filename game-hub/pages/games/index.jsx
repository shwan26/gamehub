// pages/games/index.jsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

const GamesPage = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({ title: '', imgSrc: '' });

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/api/games');
            const data = await response.json();
            setGames(data);
        };
        fetchGames();
    }, []);

    const handleChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGame),
        });
        setNewGame({ title: '', imgSrc: '' });
        const response = await fetch('/api/games');
        const data = await response.json();
        setGames(data);
    };

    const handleDelete = async (id) => {
        await fetch(`/api/games?id=${id}`, { method: 'DELETE' });
        setGames(games.filter(game => game.id !== id));
    };

    return (
        <div className="container">
            <h1>Game List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newGame.title}
                    onChange={handleChange}
                    placeholder="Game Title"
                    required
                />
                <input
                    type="text"
                    name="imgSrc"
                    value={newGame.imgSrc}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                />
                <button type="submit">Add Game</button>
            </form>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <Link href={`/games/${game.id}`}>
                            {game.title}
                        </Link>
                        <button onClick={() => handleDelete(game.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GamesPage;
