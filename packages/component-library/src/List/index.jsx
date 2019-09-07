import React from 'react';
import { arrayOf, node, string } from 'prop-types';
import classnames from 'classnames';

import './index.css';

const List = ({ children, className, ...props }) => (
    <ul className={classnames('list', [className])} {...props}>
        {children}
    </ul>
);

List.propTypes = {
    children: arrayOf(node),
    className: string
};

export default List;
