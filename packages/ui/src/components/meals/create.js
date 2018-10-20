import React from 'react';

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
