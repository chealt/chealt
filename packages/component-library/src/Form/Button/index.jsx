import React from 'react';
import classnames from 'classnames';
import { bool, node } from 'prop-types';

import './index.css';

const Button = ({ children, isActive, isInProgress, ...props }) => (
    <button
        className={classnames('button', {
            active: isActive,
            disabled: isInProgress
        })}
        {...props}>
        {children}
    </button>
);

Button.propTypes = {
    children: node.isRequired,
    isActive: bool,
    isInProgress: bool
};

export default Button;
