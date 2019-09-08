import React from 'react';
import { arrayOf, bool, node, string } from 'prop-types';
import classnames from 'classnames';

import './index.css';

const List = ({ children, className, isLastRight, ...props }) => (
    <ul
        className={classnames('list', [className], {
            'last-right': isLastRight
        })}
        {...props}>
        {children}
    </ul>
);

List.propTypes = {
    children: arrayOf(node),
    className: string,
    isLastRight: bool
};

export default List;
