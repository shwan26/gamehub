import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/library">Library</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/transaction">Transactions</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
// done