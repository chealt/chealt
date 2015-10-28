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
    }
});