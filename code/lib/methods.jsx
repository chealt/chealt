Meteor.methods({
    attendEvent(eventId) {
        Events.update({ _id: eventId}, {
            $push: {
                guests: {
                    'user': Meteor.user(),
                    'RSVP': 'attend'
                }
            }
        });
    },
    unattendEvent(eventId) {
        Events.update({ _id: eventId}, {
            $pull: {
                guests: {
                    'user': Meteor.user(),
                    'RSVP': 'attend'
                }
            }
        });
    }
});