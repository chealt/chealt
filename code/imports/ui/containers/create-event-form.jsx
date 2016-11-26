import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';

import mapItemsToOptions    from '../helpers/map-items-to-options';
import CreateEventForm      from '../components/events/create-event-form';
import { Activities }       from '../../api/activities/activities';

const CreateEventFormContainer = createContainer(() => {
    const activitiesHandle = Meteor.subscribe('activities');
    const activities = activitiesHandle.ready() ? Activities.find().fetch() : [];

    return {
        activities: mapItemsToOptions(activities, 'name', '_id')
    };
}, CreateEventForm);

export default CreateEventFormContainer;