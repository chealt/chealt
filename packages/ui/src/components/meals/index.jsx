import React, { Fragment } from 'react';
import { array } from 'prop-types';

const Meals = ({ meals }) => (
    <Fragment>
        {meals && meals.map(({ name, datetime }) => (
            <div key={name}>{name}, {datetime}</div>
        )) || null}
    </Fragment>
);

Meals.propTypes = {
    meals: array
};

export default Meals;
