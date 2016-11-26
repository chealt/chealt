import React            from 'react';

import InputContainer   from './input-container';

const Select = ({ name, label, options }) => (
    <InputContainer>
        <label className='label' for={name}>{label}</label>
        <select name={name} id={name}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.name}</option>
            ))}
        </select>
    </InputContainer>
);

export default Select;

Select.propTypes = {
    options: React.PropTypes.array.isRequired
};