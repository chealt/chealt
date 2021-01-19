import { h } from 'preact';
import { useEffect, useContext } from 'preact/hooks';

import { Context } from '../../context';

const SignIn = () => {
  const { setAuthMenuOpen, setGoogleUser, setLoadingAuth } = useContext(Context);

  const SignIn = () => {
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
  };

  useEffect(() => {
    const googlePlatformScript = document.querySelector('#googleScript');

    googlePlatformScript.addEventListener('load', SignIn);
  });

  return (
    <div id="google-signin" />
  );
};

export default SignIn;
