Meteor.publish('comments', () => {
    return Comments.find();
});

Meteor.publish('activities', () => {
    return Activities.find();
});

Meteor.publish('events', function () {
    let events;

    if (this.userId) {
        events = Events.find({
            $or: [
                { public: true },
                { sharedWith: this.userId },
                { 'host._id': this.userId }
            ]
        });
    } else {
        events = Events.find({
            public: true
        });
    }

    return events;
});

Meteor.publish('userData', function () {
    if (this.userId) {
        return Meteor.users.find(
            { _id: this.userId },
            {
                fields: {
                    'profile': 1,
                    'services.google.accessToken': 1,
                    'services.facebook.accessToken': 1
                }
            }
        );
    } else {
        this.ready();
    }
});