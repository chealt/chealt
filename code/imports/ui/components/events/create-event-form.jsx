import React            from 'react';

import Form             from '../form/form';

import TextField        from 'material-ui/lib/text-field';
import SelectField      from 'material-ui/lib/select-field';
import MenuItem         from 'material-ui/lib/menus/menu-item';
import Checkbox         from 'material-ui/lib/checkbox';
import DatePicker       from 'material-ui/lib/date-picker/date-picker';
import TimePicker       from 'material-ui/lib/time-picker/time-picker';

const CreateEventForm = ({ activities, selectedActivityValue }) => (
    <Form name='create-event-form'>
        <div className='input-container'>
            <TextField name='event-name' hintText='name' />
        </div>
        <div className='input-container'>
            <TextField name='event-host' hintText='host' />
        </div>
        <div className='input-container'>
            <DatePicker name='event-start' hintText='start date' />
            <TimePicker format='24hr' hintText='start time' />
        </div>
        <div className='input-container'>
            <DatePicker name='event-end' hintText='end date' />
            <TimePicker format='24hr' hintText='end time' />
        </div>
        <div className='input-container'>
            <TextField name='event-location' hintText='location' />
        </div>
        <div className='input-container'>
            <SelectField value={selectedActivityValue}>
            {activities.map((activity, index) => (
                <MenuItem key={index} value={activity.value} primaryText={activity.name} />
            ))}
            </SelectField>
        </div>
        <div className='input-container'>
            <Checkbox name='event-is-public' label='public' />
        </div>
    </Form>
);

export default CreateEventForm;