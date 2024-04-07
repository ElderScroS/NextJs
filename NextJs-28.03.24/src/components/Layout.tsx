import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contacts">Contacts</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/account">Account</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
