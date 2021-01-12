import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const renderGoogleSignIn = () => {
    const onSuccess = (googleUser) => {
      console.log(`Logged in as: ${googleUser.getBasicProfile().getName()}`);
    };

    const onFailure = (error) => {
      console.log(error);
    };

    window.gapi.signin2.render('google-signin', {
      scope: 'profile email https://www.googleapis.com/auth/fitness.activity.read',
      longtitle: true,
      theme: 'dark',
      onsuccess: onSuccess,
      onfailure: onFailure
    });
  };

  useEffect(() => {
    document.querySelector('#googleScript').addEventListener('load', () => {
      renderGoogleSignIn();
    });
  });

  return (
    <header class={style.header}>
      <nav>
        <button onClick={() => {
          setLoginOpen(!isLoginOpen);
        }}>Login</button>
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
