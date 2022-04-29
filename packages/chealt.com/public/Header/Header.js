import styles from './style.module.css';

const Header = () => (
  <header class={styles.header}>
    <nav>
      <a href="/">Home</a>
      <a href="/documents">Documents</a>
    </nav>
  </header>
);

export default Header;
