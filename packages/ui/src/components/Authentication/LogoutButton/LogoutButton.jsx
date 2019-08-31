import React from 'react';
import { bool, func } from 'prop-types';

import { Button } from '@chealt/component-library';

const LogoutButton = ({ authInProgress, logout }) => (
    <Button onClick={logout} isInProgress={authInProgress}>
        Logout
    </Button>
);

LogoutButton.propTypes = {
    authInProgress: bool,
    logout: func.isRequired
};

export default LogoutButton;
