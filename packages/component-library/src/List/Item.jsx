import React from 'react';
import { node } from 'prop-types';

const Item = ({ children, ...props }) => <li {...props}>{children}</li>;

Item.propTypes = {
    children: node
};

export default Item;
