import React            from 'react';

import InputContainer   from './input-container';

const DateTimeInput = ({ name, label }) => (
    <InputContainer>
        <label className='label' for={name}>{label}</label>
        <input type='text' id={name} name={name} />
    </InputContainer>
);

export default DateTimeInput;