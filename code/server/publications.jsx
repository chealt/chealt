Meteor.publish('comments', () => {
    return Comments.find();
});

Meteor.publish('activities', () => {
    return Activities.find();
});

Meteor.publish('events', () => {
    return Events.find();
});

Meteor.publish('userData', function () {
    if (this.userId) {
        return Meteor.users.find(
            { _id: this.userId },
            { fields: { 'profile': 1, 'services.google.accessToken': 1 } }
        );
    } else {
        this.ready();
    }
});