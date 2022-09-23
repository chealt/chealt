import styles from './index.module.css';

const Header = () => (
  <header class={styles.header}>
    <nav>
      <a href="/">Home</a>
      <a href="/documents">Documents</a>
      <a href="/share">Share</a>
      <a href="/personal-details">Personal Details</a>
      <a href="/vaccinations">Vaccinations</a>
    </nav>
  </header>
);

export default Header;
