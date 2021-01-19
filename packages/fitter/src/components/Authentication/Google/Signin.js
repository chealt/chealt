import { h } from 'preact';
import { useEffect, useContext, useState, useCallback } from 'preact/hooks';

import { Context } from '../../context';

const SignIn = ({ isHidden }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { googleUser, setAuthMenuOpen, setGoogleUser, setLoadingAuth } = useContext(Context);

  const renderSignIn = useCallback(() => {
    setScriptLoaded(true);
    window.gapi.signin2.render('google-signin', {
      scope: 'profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read',
      longtitle: true,
      theme: 'dark',
      onsuccess: async (user) => {
        setLoadingAuth(false);
        setGoogleUser(user);
        setAuthMenuOpen(false);
      },
      onfailure: (error) => {
        throw new Error(error);
      }
    });
    setLoadingAuth(false);
  }, [setScriptLoaded, setLoadingAuth, setAuthMenuOpen, setGoogleUser]);

  useEffect(() => {
    if (!scriptLoaded) {
      const googlePlatformScript = document.querySelector('#googleScript');

      googlePlatformScript.addEventListener('load', () => setScriptLoaded(true));
    }
  }, [scriptLoaded]);

  useEffect(() => {
    if (!googleUser && scriptLoaded) {
      renderSignIn();
    }
  }, [googleUser, scriptLoaded, renderSignIn]);

  return (
    <div id="google-signin" class={isHidden ? 'hidden' : ''} />
  );
};

export default SignIn;
