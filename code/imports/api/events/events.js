import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

const isSharedWithUser = (event, userId) => {
    return event.sharedWith && event.sharedWith.find((user) => {
        return user._id === userId;
    });
};

Events.allow({
    insert: function (userId) {
        return userId;
    },
    update: function (userId, document) {
        const isHost = userId === document.host._id;

        return isHost || isSharedWithUser(document, userId);
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
