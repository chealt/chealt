import React from 'react';
import { array } from 'prop-types';

import { List, ListItem } from '@chealt/component-library';

const Feelings = ({ feelings }) => (
    <List className="padded">
        {feelings.map(({ id, feeling }) => (
            <ListItem key={id}>{feeling}</ListItem>
        ))}
    </List>
);

Feelings.propTypes = {
    feelings: array
};

export default Feelings;
