import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Context } from '../context';
import GoogleSignin from '../Authentication/Google/GoogleSignin';
import Button from '../Button/Button';

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
          <Button size="small" onClick={toggleLogin}>Login</Button>
        )}
        {userName && (
          <>
            <span>{userName}</span>
            <img src={profileImageUrl} class={style.avatar} />
          </>
        )}
        {isLoadingAuth && (
          <span>Loading...</span>
        )}
      </nav>
      <ul class={style.menu} style={{ display: isLoginOpen ? 'block' : 'none' }}>
        <li>
          <GoogleSignin />
        </li>
      </ul>
    </header>
  );
}

export default Header;
