import React from 'react';

const CreateButton = ({ createMethod }) => (
    <IconButton
        type='plus'
        action={createMethod}
        additionalClasses='create main circular shadow floating bottom right' />
);

export default CreateButton;

CreateButton.propTypes = {
    createMethod: React.PropTypes.func.isRequired
};
