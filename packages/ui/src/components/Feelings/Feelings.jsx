import React from 'react';
import { array } from 'prop-types';

const Feelings = ({ feelings }) => (
    <ul>
        {feelings.map(({ id, feeling }) => (
            <li key={id}>{feeling}</li>
        ))}
    </ul>
);

Feelings.propTypes = {
    feelings: array
};

export default Feelings;
