/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Events } from '../events.js';

Meteor.publish('events', function eventsPublication() {
    /*if (!this.userId) {
        return this.ready();
    }*/

    return Events.find();
});
