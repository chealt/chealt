import React from 'react';

const Form = ({ name, children }) => (
    <form className='form' name={name}>
        {children}
    </form>
);

export default Form;

Form.propTypes = {
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};