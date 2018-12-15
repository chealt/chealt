import React, { Fragment } from 'react';
import { string } from 'prop-types';

import Meals from './meals/container';
import NavBar from './views/nav-bar.container';
import CreateButton from './create-button/container';
import Input from './form/input';

import './app.css';

const App = ({ currentView }) => (
    <Fragment>
        <Input
            type="text"
            name="feeling"
            placeholder="Tell me how you feel..."
        />
        <div className="view-container">
            {(currentView === 'meals' && <Meals />) || <div />}
        </div>
        <CreateButton />
        <NavBar />
    </Fragment>
);

App.propTypes = {
    currentView: string.isRequired
};

export default App;
