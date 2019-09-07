import React from 'react';
import { bool, node } from 'prop-types';
import classnames from 'classnames';

import './item.css';

const Item = ({ children, isBordered, ...props }) => (
    <li
        className={classnames('list-item', 'padded--l', {
            bordered: isBordered
        })}
        {...props}>
        {children}
    </li>
);

Item.propTypes = {
    children: node,
    isBordered: bool
};

export default Item;
