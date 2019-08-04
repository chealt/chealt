import React from 'react';
import { node } from 'prop-types';

import './index.css';

const Form = ({ children }, ...props) => (
    <form className="form" {...props}>
        {children}
    </form>
);

Form.propTypes = {
    children: node.isRequired
};

export default Form;
