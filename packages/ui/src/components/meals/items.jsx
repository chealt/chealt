import React from 'react';

const Items = ({ meals }) => (
    meals.map(({ name, datetime }) => (
        <div key={name}>{name}, {datetime}</div>
    ))
);

export default Items;
