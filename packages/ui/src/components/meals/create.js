import React from 'react';

import Form from '../form/index';
import Input from '../form/input';

const Create = () => (
    <div className="meal create container">
        <Form name="meal.create">
            <Input
                type="text"
                name="meal.label" />
        </Form>
    </div>
);

export default Create;
