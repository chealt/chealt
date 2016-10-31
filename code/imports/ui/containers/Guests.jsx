import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import Guests               from '../components/events/guests.jsx';

export default createContainer(({ params }) => {
    return {
        user: Meteor.user()
    };
}, Guests);