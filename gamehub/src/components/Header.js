import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h5">Game Hub</h1>
          <ul className="nav">
            <li className="nav-item">
              <Link href="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/library" className="nav-link text-white">
                Library
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link text-white">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" className="nav-link text-white">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/transactionHistory" className="nav-link text-white">
                Transactions
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
