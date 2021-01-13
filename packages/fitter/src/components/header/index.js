import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

const Header = () => {
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const throwError = (error) => {
    throw new Error(error);
  };
  const userName = user && user.getBasicProfile().getName();

  const renderGoogleSignIn = () => {
    window.gapi.signin2.render('google-signin', {
      scope: 'profile email https://www.googleapis.com/auth/fitness.activity.read',
      longtitle: true,
      theme: 'dark',
      onsuccess: (user) => {
        setLoadingAuth(false);
        setUser(user);
        setLoginOpen(false);
      },
      onfailure: throwError
    });
  };

  useEffect(() => {
    const googlePlatformScript = document.querySelector('#googleScript');

    googlePlatformScript.addEventListener('load', renderGoogleSignIn);
  });

  return (
    <header class={style.header}>
      <nav>
        {!user && !isLoadingAuth && (
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
          <div id="google-signin" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
