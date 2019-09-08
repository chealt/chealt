import React from 'react';
import { array } from 'prop-types';

import { FormattedDate, List, ListItem } from '@chealt/component-library';

const Feelings = ({ feelings }) => (
    <List className="margin--l">
        {feelings.map(({ id, feeling }) => (
            <ListItem key={id} isBordered>
                {feeling}
                <FormattedDate date={id} />
            </ListItem>
        ))}
    </List>
);

Feelings.propTypes = {
    feelings: array
};

export default Feelings;
