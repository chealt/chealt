import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import FeelingsForm from './FeelingsForm';
import Header from './Header';
import LoginButton from './Authentication/LoginButton';
import LogoutButton from './Authentication/LogoutButton';
import Feelings from './Feelings';

import './app.css';

const App = ({ isAuthenticated }) => (
    <Fragment>
        <Header>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
        </Header>
        <FeelingsForm />
        <Feelings />
    </Fragment>
);

App.propTypes = {
    isAuthenticated: bool
};

export default App;
