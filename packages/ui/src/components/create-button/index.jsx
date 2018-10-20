import React from 'react';
import { func, string } from 'prop-types';

import Button from '../form/button';

const CreateButton = ({ currentView, showCreateItem }) => (
    <Button onClick={() => showCreateItem(currentView)}>
        CREATE
    </Button>
);

CreateButton.propTypes = {
    currentView: string.isRequired,
    showCreateItem: func.isRequired
};

export default CreateButton;
