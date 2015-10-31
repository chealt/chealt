Meteor.methods({
    attendEvent(eventId) {
        const userProfile = Meteor.user().profile;

        Events.update({ _id: eventId}, {
            $push: {
                guests: {
                    email: userProfile.email,
                    name: userProfile.name,
                    picture: userProfile.picture,
                    RSVP: 'attend'
                }
            }
        });
    },
    unattendEvent(eventId) {
        Events.update({ _id: eventId}, {
            $pull: {
                guests: {
                    email: Meteor.user().profile.email
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
            $addToSet: {
                'profile.activityTypes': {
                    $each: _activities
                }
            }
        });
    },
    postComment(comment) {
        const userProfile = Meteor.user().profile;
        const _comment = _.extend({
            createdOn: new Date(),
            user: {
                email: userProfile.email,
                name: userProfile.name,
                picture: userProfile.picture
            }
        }, comment);

        Comments.insert(_comment);
    }
});