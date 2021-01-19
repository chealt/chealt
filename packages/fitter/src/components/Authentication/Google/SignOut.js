import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { Context } from '../../context';
import Button from '../../Button/Button';

const SignOut = () => {
  const { setGoogleUser } = useContext(Context);

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setGoogleUser();
    });
  };

  return (
    <Button type="ghost" size="small" onClick={signOut}>Sign out</Button>
  );
};

export default SignOut;
