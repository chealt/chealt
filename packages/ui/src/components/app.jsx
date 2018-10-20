import React, { Fragment } from 'react';
import { string } from 'prop-types';

import Meals from './meals/container';
import NavBar from './views/nav-bar.container';

import './app.css';

const App = ({ currentView }) => (
    <Fragment>
        <div className="view-container">
            {currentView === 'meals' && (
                <Meals />
            ) || (
                <div>home</div>
            )}
        </div>
        <NavBar />
    </Fragment>
);

App.propTypes = {
    currentView: string.isRequired
};

export default App;
