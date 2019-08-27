import React from 'react';
import { func } from 'prop-types';

import { Button } from '@chealt/component-library';

const LogoutButton = ({ logout }) => <Button onClick={logout}>Logout</Button>;

LogoutButton.propTypes = {
    logout: func.isRequired
};

export default LogoutButton;
