/* eslint-disable prefer-arrow-callback */
import { Meteor }       from 'meteor/meteor';
import { Mongo }        from 'meteor/mongo';
import { Comments }     from '../comments.js';

Meteor.publish('comments.public', function commentsPublication() {
    return Comments.find({ deleted: { $exists: false } });
});

Meteor.publish('comments.private', function commentsPublication() {
    return Comments.find({ "user._id": this.userId });
});
