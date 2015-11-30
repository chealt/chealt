Comments = new Mongo.Collection('comments');
Activities = new Mongo.Collection('activities');
Events = new Mongo.Collection('events');

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

Activities.allow({
    insert() {
        return true;
    },
    update() {
        return false;
    },
    remove() {
        return false;
    }
});

Comments.allow({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove: function (userId, document) {
        return userId === document.user._id;
    }
});
