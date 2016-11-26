/* eslint-disable prefer-arrow-callback */
import { Meteor }       from 'meteor/meteor';
import { Mongo }        from 'meteor/mongo';
import { Activities }   from '../activities.js';

Meteor.publish('activities', function activitiesPublication() {
    return Activities.find();
});
