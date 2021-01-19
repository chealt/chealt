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
    <div class={style.content}>
      <span>{userName}</span>
      <img src={profileImageUrl} class={style.avatar} onClick={() => setAuthMenuOpen(!isAuthMenuOpen)} />
    </div>
  );
};

export default LoggedIn;
