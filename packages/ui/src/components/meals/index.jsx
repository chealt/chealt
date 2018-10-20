import React from 'react';
import { array } from 'prop-types';

const Meals = ({ meals }) => (
    meals && meals.map(({ name, datetime }) => (
        <div key={name}>{name}, {datetime}</div>
    )) || null
);

Meals.propTypes = {
    meals: array
};

export default Meals;
