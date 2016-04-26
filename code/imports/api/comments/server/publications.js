/* eslint-disable prefer-arrow-callback */
import { Meteor }       from 'meteor/meteor';
import { Mongo }        from 'meteor/mongo';
import { Comments }     from '../comments.js';

Meteor.publish('comments', function commentsPublication() {
    return Comments.find();
});
