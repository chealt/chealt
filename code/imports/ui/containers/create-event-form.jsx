import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';

import mapItemsToOptions    from '../helpers/map-items-to-options';
import CreateEventForm      from '../components/events/create-event-form';
import { Activities }       from '../../api/activities/activities';

const CreateEventFormContainer = createContainer(() => {
    const activitiesHandle = Meteor.subscribe('activities');
    const activities = activitiesHandle.ready() ? Activities.find().fetch() : [];
    const activityOptions = mapItemsToOptions(activities, 'name', '_id');
    const selectedActivityValue = activityOptions.length ? activityOptions[0].value : '';

    return {
        activities: activityOptions,
        selectedActivityValue
    };
}, CreateEventForm);

export default CreateEventFormContainer;