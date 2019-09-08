import React from 'react';
import { array } from 'prop-types';

import { FormattedDate, List, ListItem } from '@chealt/component-library';

const Feelings = ({ feelings }) => (
    <List className="margin--l" isLastRight>
        {feelings.map(({ id, feeling }) => (
            <ListItem key={id} isBordered>
                <span>{feeling}</span>
                <span>
                    <FormattedDate date={id} />
                </span>
            </ListItem>
        ))}
    </List>
);

Feelings.propTypes = {
    feelings: array
};

export default Feelings;
