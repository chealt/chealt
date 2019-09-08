import React from 'react';
import classnames from 'classnames';
import { bool, node, string } from 'prop-types';

import './index.css';

const Button = ({ children, className, isActive, isInProgress, ...props }) => (
    <button
        className={classnames('button', {
            active: isActive,
            disabled: isInProgress,
            [className]: className
        })}
        {...props}>
        {children}
    </button>
);

Button.propTypes = {
    children: node.isRequired,
    className: string,
    isActive: bool,
    isInProgress: bool
};

export default Button;
