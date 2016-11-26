import React            from 'react';

import InputContainer   from './input-container';

const Checkbox = ({ name, label }) => (
    <InputContainer>
        <label className='label' for={name}>{label}</label>
        <input type='checkbox' id={name} name={name} />
    </InputContainer>
);

export default Checkbox;