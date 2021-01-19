import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { Context } from '../../context';

import style from './style.css';

const LoggedIn = () => {
  const { googleUser, isAuthMenuOpen, setAuthMenuOpen } = useContext(Context);
  const userProfile = googleUser?.getBasicProfile();
  const userName = userProfile?.getName();
  const profileImageUrl = userProfile?.getImageUrl();

  return (
    <div class={style.content} onClick={() => setAuthMenuOpen(!isAuthMenuOpen)}>
      <span>{userName}</span>
      <img src={profileImageUrl} class={style.avatar} alt="Avatar" />
    </div>
  );
};

export default LoggedIn;
