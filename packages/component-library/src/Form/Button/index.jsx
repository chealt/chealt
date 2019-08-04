import React from 'react';
import classnames from 'classnames';
import { bool, node } from 'prop-types';

import './index.css';

const Button = ({ children, isActive, ...props }) => (
    <button
        className={classnames('button', { active: isActive })}
        {...props}>
        {children}
    </button>
);

Button.propTypes = {
    children: node.isRequired,
    isActive: bool
};

export default Button;
