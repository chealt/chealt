import React from 'react';
import { array } from 'prop-types';

const Meals = ({ meals }) => (
    meals.map(({ name, datetime }) => (
        <div key={name}>{name}, {datetime}</div>
    ))
);

Meals.propTypes = {
    meals: array.isRequired
};

export default Meals;
