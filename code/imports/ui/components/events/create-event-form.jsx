import React            from 'react';

import Form             from '../form/form';
import TextInput        from '../form/text-input';
import DateTimeInput    from '../form/date-time-input';
import Select           from '../form/select';
import Checkbox         from '../form/checkbox';

const CreateEventForm = ({ activities }) => (
    <Form name='create-event-form'>
        <TextInput name='event-name' label='name' />
        <TextInput name='event-host' label='host' />
        <DateTimeInput name='event-start' label='start' />
        <DateTimeInput name='event-end' label='end' />
        <TextInput name='event-location' label='location' />
        <Select name='event-activity' label='activity' options={activities} />
        <Checkbox name='event-is-public' label='public' />
    </Form>
);

export default CreateEventForm;