Meteor.methods({
    attendEvent(eventId) {
        Events.update({ _id: eventId}, {
            $push: {
                guests: {
                    'user': Meteor.user().profile,
                    'RSVP': 'attend'
                }
            }
        });
    },
    unattendEvent(eventId) {
        Events.update({ _id: eventId}, {
            $pull: {
                guests: {
                    'user': Meteor.user().profile,
                    'RSVP': 'attend'
                }
            }
        });
    },
    updateUserWeight(weight) {
        Meteor.users.update({ _id: Meteor.userId()}, {
            $set: { 'profile.weight': weight }
        });
    },
    updateUserActivities(activityTypes) {
        const _activities = activityTypes.reduce((result, activity) => {
            const _activity = Activities.findOne({ googleFitType: activity });

            if (_activity) {
                result.push({
                    _id: _activity._id,
                    name: _activity.name
                });
            }

            return result;
        }, []);

        Meteor.users.update({ _id: Meteor.userId()}, {
            $set: { 'profile.activityTypes': _activities }
        });
    }
});