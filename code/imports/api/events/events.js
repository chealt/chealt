import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.allow({
    insert: function (userId) {
        return userId;
    },
    update: function (userId, document) {
        const isHost = userId === document.host._id;
        const sharedWithItem = document.sharedWith.find((user) => {
            return user._id === userId;
        });
        const canInvite = sharedWithItem && sharedWithItem.canInvite;

        return isHost || canInvite;
    },
    remove: function (userId, document) {
        return userId === document.host._id;
    }
});

Events.publicFields = {
    id: 1,
    location: 1,
    images: 1,
    guests: 1,
    host: 1,
    geocode: 1,
    minAttendance: 1,
    maxAttendance: 1,
    activityList: 1,
    start: 1,
    end: 1
};
