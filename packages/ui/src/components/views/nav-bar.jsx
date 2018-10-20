import React from 'react';
import { func, string } from 'prop-types';

import views from './data.json';
import Button from '../form/button';

import './nav-bar.css';

const NavBar = ({ changeCurrentView, currentView }) => (
    <nav className="main nav-bar">
        {views.map(({ name, label }) => (
            <Button
                key={name}
                onClick={() => changeCurrentView(name)}
                isActive={name === currentView}>
                {label}
            </Button>
        ))}
    </nav>
);

NavBar.propTypes = {
    changeCurrentView: func.isRequired,
    currentView: string.isRequired
};

export default NavBar;
