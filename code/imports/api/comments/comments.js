import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

Comments.allow({
    insert: function (userId) {
        return userId;
    },
    update: function (userId, document) {
        return userId === document.user._id;
    },
    remove: function (userId, document) {
        return userId === document.user._id;
    }
});
