// pages/games/[id].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GameDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                const response = await fetch(`/api/games`);
                const games = await response.json();
                const foundGame = games.find(g => g.id === parseInt(id));
                setGame(foundGame);
            };
            fetchGame();
        }
    }, [id]);

    const handleChange = (e) => {
        setGame({ ...game, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        });
        router.push('/games');
    };

    if (!game) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Edit Game</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="title"
                    value={game.title}
                    onChange={handleChange}
                    placeholder="Game Title"
                    required
                />
                <input
                    type="text"
                    name="imgSrc"
                    value={game.imgSrc}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                />
                <button type="submit">Update Game</button>
            </form>
        </div>
    );
};

export default GameDetailPage;
