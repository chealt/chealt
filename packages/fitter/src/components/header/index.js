import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Context } from '../context';
import GoogleSignin from '../Authentication/Google/GoogleSignin';

import style from './style.css';

const Header = () => {
  const { googleUser, isLoadingAuth } = useContext(Context);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const userProfile = googleUser?.getBasicProfile();
  const userName = userProfile?.getName();
  const profileImageUrl = userProfile?.getImageUrl();

  return (
    <header class={style.header}>
      <nav>
        {!googleUser && !isLoadingAuth && (
          <button onClick={toggleLogin}>Login</button>
        )}
        {userName && (
          <>
            <span>{userName}</span>
            <img src={profileImageUrl} className={style.avatar} />
          </>
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
