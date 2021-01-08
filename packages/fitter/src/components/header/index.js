import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <nav>
      <Link activeClassName={style.active} href="/">Login</Link>
    </nav>
  </header>
);

export default Header;
