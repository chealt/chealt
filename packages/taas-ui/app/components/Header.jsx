import { Link } from 'remix';

import MenuIcon from './Icons/Menu';

export const links = () => [
  {
    rel: 'preload',
    href: './menu.svg',
    as: 'image',
    type: 'image/svg+xml'
  }
];

const Header = () => (
  <header className="bx--header">
    <button className="bx--header__menu-toggle bx--header__action bx--header__menu-trigger">
      <MenuIcon />
    </button>
    <Link to="/" className="bx--header__name">
      TaaS UI
    </Link>
  </header>
);

export default Header;
