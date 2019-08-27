import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import FeelingsForm from './FeelingsForm';
import Header from './Header';
import LoginButton from './Authentication/LoginButton';
import LogoutButton from './Authentication/LogoutButton';

import './app.css';

const App = ({ authInProgress, isAuthenticated }) => (
    <Fragment>
        <Header>
            {!authInProgress && !isAuthenticated && <LoginButton />}
            {!authInProgress && isAuthenticated && <LogoutButton />}
        </Header>
        <FeelingsForm />
    </Fragment>
);

App.propTypes = {
    authInProgress: bool,
    isAuthenticated: bool
};

export default App;
