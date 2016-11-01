import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import HomePage             from '../components/home-page.jsx';
import { Events }           from '../../api/events/events.js';

const transformFilterInput = (input) => {
    let transformedFilter = {};

    if (input) {
        const beginWithRegExp = (new RegExp(input, 'i'));

        transformedFilter = {
            $or: [
                { name: beginWithRegExp },
                { host: beginWithRegExp },
                { location: beginWithRegExp }
            ]
        };
    }

    return transformedFilter;
};

export default createContainer(({ filter }) => {
    const eventsHandle = Meteor.subscribe('events');

    return {
        canComment: Boolean(Meteor.userId()),
        events: eventsHandle.ready() ? Events.find(transformFilterInput(filter)).fetch() : []
    };
}, HomePage);