import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { Context } from '../context';
import Button from '../Button/Button';

import style from './style.css';
import LoggedIn from '../Authentication/LoggedIn/LoggedIn';
import AuthMenu from '../Authentication/AuthMenu';

const Header = () => {
  const { googleUser, isLoadingAuth, isAuthMenuOpen, setAuthMenuOpen } = useContext(Context);
  const toggleSignIn = () => setAuthMenuOpen(!isAuthMenuOpen);

  return (
    <header class={style.header}>
      <nav>
        {!googleUser && !isLoadingAuth && (
          <Button size="small" onClick={toggleSignIn}>Sign In</Button>
        )}
        {googleUser && (
          <LoggedIn />
        )}
        {isLoadingAuth && (
          <span>Loading...</span>
        )}
      </nav>
      <AuthMenu />
    </header>
  );
}

export default Header;
