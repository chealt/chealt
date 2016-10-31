/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Events } from '../events.js';

Meteor.publish('events', function eventsPublication() {
    return Events.find({
        $or: [
            { isPublic: true },
            { "host._id": this.userId },
            { sharedWith: { $elemMatch: { _id: this.userId } } }
        ]
    });
});
