import React, { Fragment } from 'react';

import FeelingsForm from './FeelingsForm';
import Header from './Header';
import LoginButton from './Header/LoginButton';

import './app.css';

const App = () => (
    <Fragment>
        <Header>
            <LoginButton />
        </Header>
        <FeelingsForm />
    </Fragment>
);

export default App;
