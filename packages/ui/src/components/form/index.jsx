import React from 'react';

const Form = ({ children }, ...props) => (
    <form {...props}>
        {children}
    </form>
);

export default Form;
