import { h } from 'preact';
import { useEffect, useContext } from 'preact/hooks';

import { Context } from '../../context';

const GoogleSignin = () => {
  const { setGoogleUser, setLoadingAuth } = useContext(Context);

  const renderGoogleSignIn = () => {
    window.gapi.signin2.render('google-signin', {
      scope: 'profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read',
      longtitle: true,
      theme: 'dark',
      onsuccess: async (user) => {
        setLoadingAuth(false);
        setGoogleUser(user);
      },
      onfailure: (error) => {
        throw new Error(error);
      }
    });
    setLoadingAuth(false);
  };

  useEffect(() => {
    const googlePlatformScript = document.querySelector('#googleScript');

    googlePlatformScript.addEventListener('load', renderGoogleSignIn);
  });

  return (
    <div id="google-signin" />
  );
};

GoogleSignin.propTypes = {};

export default GoogleSignin;
