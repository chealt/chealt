import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import FeelingsForm from './FeelingsForm';
import Header from './Header';
import LoginButton from './Authentication/LoginButton';

import './app.css';

const App = ({ hideLogin }) => (
    <Fragment>
        <Header>{!hideLogin && <LoginButton />}</Header>
        <FeelingsForm />
    </Fragment>
);

App.propTypes = {
    hideLogin: bool
};

export default App;
