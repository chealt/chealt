import React from 'react';
import classnames from 'classnames';

import './button.css';

const Button = ({ children, isActive, ...props }) => (
    <button
        className={classnames('button', { active: isActive })}
        {...props}>
        {children}
    </button>
);

export default Button;
