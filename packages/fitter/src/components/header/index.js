import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Context } from '../context';
import GoogleSignin from '../Authentication/Google/GoogleSignin';

import style from './style.css';

const Header = () => {
  const { googleUser, isLoadingAuth } = useContext(Context);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const userName = googleUser && googleUser.getBasicProfile().getName();

  return (
    <header class={style.header}>
      <nav>
        {!googleUser && !isLoadingAuth && (
          <button onClick={toggleLogin}>Login</button>
        )}
        {userName && (
          <span>{userName}</span>
        )}
        {isLoadingAuth && (
          <span>Loading...</span>
        )}
      </nav>
      <ul style={{display: isLoginOpen ? 'block' : 'none'}}>
        <li>
          <GoogleSignin />
        </li>
      </ul>
    </header>
  );
}

export default Header;
