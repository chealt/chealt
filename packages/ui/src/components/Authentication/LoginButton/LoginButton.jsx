import React from 'react';
import { bool, func } from 'prop-types';

import { Button } from '@chealt/component-library';

const LoginButton = ({ authInProgress, login }) => (
    <Button
        className="border-radius"
        onClick={login}
        isBordered
        isInProgress={authInProgress}>
        Login
    </Button>
);

LoginButton.propTypes = {
    authInProgress: bool,
    login: func.isRequired
};

export default LoginButton;
