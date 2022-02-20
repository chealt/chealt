import { Link } from 'remix';

import MenuIcon from './Icons/Menu';
import UserAvatar from './Icons/UserAvatar';

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
    <div className="bx--header__global">
      <button className="bx--header__action">
        <UserAvatar />
      </button>
    </div>
  </header>
);

export default Header;
