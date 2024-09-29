import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <h1>GameHub</h1>
      <nav>
        <ul>
          <li><Link href="/">Store</Link></li>
          <li><Link href="/library">Library</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}
