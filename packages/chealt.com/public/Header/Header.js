import styles from './Header.module.css';

const Header = () => (
  <header class={styles.header}>
    <nav>
      <a href="/">Home</a>
      <a href="/documents">Documents</a>
      <a href="/share">Share</a>
      <a href="/personal-details">Personal Details</a>
      <a href="/check-ups">Check-ups</a>
      <a href="/vaccinations">Vaccinations</a>
      <a href="/profiles">Profiles</a>
    </nav>
  </header>
);

export default Header;
