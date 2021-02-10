import { h } from 'preact';
import { useEffect, useContext, useCallback } from 'preact/hooks';

import { Context } from '../../context';

const SignIn = ({ isHidden }) => {
  const { googleUser, setAuthMenuOpen, setGoogleUser, isLoadingAuth, setLoadingAuth } = useContext(Context);

  const renderSignIn = useCallback(() => {
    window.gapi.signin2.render('google-signin', {
      scope:
        'profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read',
      longtitle: true,
      theme: 'dark',
      onsuccess: async (user) => {
        setGoogleUser(user);
        setAuthMenuOpen(false);
      },
      onfailure: (error) => {
        throw new Error(error);
      }
    });
  }, [setAuthMenuOpen, setGoogleUser]);

  useEffect(() => {
    if (isLoadingAuth) {
      const googlePlatformScript = document.querySelector('#googleScript');

      googlePlatformScript.addEventListener('load', () => setLoadingAuth(false));
    }
  }, [isLoadingAuth]);

  useEffect(() => {
    if (!googleUser && !isLoadingAuth) {
      renderSignIn();
    }
  }, [googleUser, isLoadingAuth, renderSignIn]);

  return <div id="google-signin" class={isHidden ? 'hidden' : ''} />;
};

export default SignIn;
