import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import HomePage             from '../components/HomePage.jsx';

export default createContainer(({ params }) => {
    const eventsHandle = Meteor.subscribe('events');

    return {
        events: eventsHandle.ready() ? eventsHandle.find().fetch() : []
    };
}, HomePage);