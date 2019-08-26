import React from 'react';
import { func } from 'prop-types';

import { Button } from '@chealt/component-library';

const LoginButton = ({ login }) => <Button onClick={login}>Login</Button>;

LoginButton.propTypes = {
    login: func.isRequired
};

export default LoginButton;
