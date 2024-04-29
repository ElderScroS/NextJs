import Link from 'next/link';
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href='/' className={styles.navbarLink}>Home</Link>
        <Link href='/contactUs' className={styles.navbarLink}>Contact Us</Link>
        <Link href='/about' className={styles.navbarLink}>About</Link>
        <Link href='/cars' className={styles.navbarLink}>Cars</Link>
      </div>
    </nav>
  );
};

export default NavBar;
