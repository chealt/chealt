import React from 'react';
import { string } from 'prop-types';

import Meals from './meals/container';

const App = ({ currentView }) => (
    currentView === 'meals' && (
        <Meals />
    ) || (
        <div>home</div>
    )
);

App.propTypes = {
    currentView: string.isRequired
};

export default App;
