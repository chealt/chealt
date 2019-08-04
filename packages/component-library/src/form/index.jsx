import React from 'react';
import { func, node } from 'prop-types';

import './index.css';

const Form = ({ children, onSubmit, ...props }) => (
    <form className="form" {...props} onSubmit={(event) => {
        if (onSubmit) {
            event.preventDefault();

            onSubmit(event);
        }
    }}>
        {children}
    </form>
);

Form.propTypes = {
    children: node.isRequired,
    onSubmit: func
};

export default Form;
