import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import HomePage             from '../components/HomePage.jsx';
import { Events }           from '../../api/events/events.js';

export default createContainer(({ params }) => {
    const eventsHandle = Meteor.subscribe('events');

    return {
        events: eventsHandle.ready() ? Events.find().fetch() : []
    };
}, HomePage);