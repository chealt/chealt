import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { Context } from '../context';

import Popover from '../Popover/Popover';
import { SignIn, SignOut } from './Google';

const AuthMenu = () => {
  const { googleUser, isAuthMenuOpen } = useContext(Context);

  return (
    <Popover isOpen={isAuthMenuOpen}>
      {googleUser && <SignOut />}
      <SignIn isHidden={googleUser} />
    </Popover>
  );
};

export default AuthMenu;
