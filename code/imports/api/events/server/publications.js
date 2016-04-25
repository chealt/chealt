/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Events } from '../events.js';

Meteor.publish('events.public', function listsPublic() {
    if (!this.userId) {
        return this.ready();
    }

    return Events.find();
});
