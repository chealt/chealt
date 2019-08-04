import React from 'react';
import { func } from 'prop-types';

import { Input, Form } from '@chealt/component-library';

const FeelingsForm = ({ saveFeeling }) => (
    <Form name="feelings-form" onSubmit={saveFeeling}>
        <Input type="text" name="feeling" />
    </Form>
);

FeelingsForm.propTypes = {
    saveFeeling: func
};

export default FeelingsForm;
