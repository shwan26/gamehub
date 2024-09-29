import Link from 'next/link';

export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <p>${game.price}</p>
      <Link href={`/game/${game.id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}
