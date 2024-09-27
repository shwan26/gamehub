// pages/index.jsx
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="container">
            <div className="sidebar">
                <h2>GameHub</h2>
                <ul>
                    <li><Link href="/games">Store</Link></li>
                    <li><Link href="#">Library</Link></li>
                    <li>
                        <h3>Quick Launch</h3>
                        <Link href="#">Chivalry 2</Link>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <div className="header">
                    <div className="logo">Store</div>
                    <div className="nav">
                        <Link href="#">Browse</Link>
                        <Link href="#">Wishlist</Link>
                        <Link href="#">Cart</Link>
                    </div>
                </div>

                {/* First Section: Available Now */}
                <div className="section">
                    <h2>Available Now</h2>
                    <div className="content">
                        <div className="image">
                            <img src="https://image.api.playstation.com/vulcan/ap/rnd/202405/2117/bd406f42e9352fdb398efcf21a4ffe575b2306ac40089d21.png" alt="Black Myth: Wukong" />
                        </div>
                        <div className="text">
                            <h3>Black Myth: Wukong</h3>
                            <p>A story of the legendary Sun Wukong after his Journey to the West.</p>
                            <Link href="/games">Buy Now for $59.99</Link>
                        </div>
                    </div>
                </div>

                {/* Second Section: Game of the Year Edition */}
                <div className="section">
                    <h2>Game of the Year Edition Coming Soon</h2>
                    <div className="content">
                        <div className="image">
                            <img src="https://cdn1.epicgames.com/spt-assets/175e781d820144ce966f1c1942b64b57/dragon-age-inquisition-game-of-the-year-edition-1y6qm.jpg" alt="Dragon Age: Inquisition" />
                        </div>
                        <div className="text">
                            <h3>Dragon Age: Inquisition</h3>
                            <p>The Game of the Year DLC will release next month. Pre-order today!</p>
                            <Link href="#">Pre-order Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
