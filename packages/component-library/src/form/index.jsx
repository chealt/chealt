import React from 'react';
import { node } from 'prop-types';

const Form = ({ children }, ...props) => (
    <form {...props}>
        {children}
    </form>
);

Form.propTypes = {
    children: node.isRequired
};

export default Form;
