import { Link } from 'remix';

import Button from './Button/Button';
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
    <Button className="bx--header__menu-toggle bx--header__action bx--header__menu-trigger" ariaLabel="Menu" iconOnly>
      <MenuIcon />
    </Button>
    <Link to="/" className="bx--header__name">
      TaaS UI
    </Link>
    <div className="bx--header__global">
      <Button className="bx--header__action" tooltip="User" position="bottom" iconOnly>
        <UserAvatar />
      </Button>
    </div>
  </header>
);

export default Header;
