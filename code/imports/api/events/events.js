import { Mongo } from 'meteor/mongo';

class EventsCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        const result = super.insert(ourDoc, callback);

        return result;
    }
    update(selector, modifier) {
        const result = super.update(selector, modifier);

        return result;
    }
    remove(selector) {
        const todos = this.find(selector).fetch();
        const result = super.remove(selector);

        return result;
    }
}

export const Events = new EventsCollection('Events');

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
