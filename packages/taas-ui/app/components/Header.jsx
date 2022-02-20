import { Link } from 'remix';

const Header = () => (
  <header className="bx--header">
    <div className="bx--header__menu-trigger"></div>
    <div className="bx--header__name">
      <Link>TaaS UI</Link>
    </div>
  </header>
);

export default Header;
