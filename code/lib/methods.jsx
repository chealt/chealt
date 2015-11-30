Meteor.methods({
    attendEvent(eventId) {
        const userProfile = Meteor.user().profile;

        Events.update({ _id: eventId}, {
            $push: {
                guests: {
                    _id: Meteor.userId(),
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
                    _id: Meteor.userId()
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
                _id: Meteor.userId(),
                email: userProfile.email,
                name: userProfile.name,
                picture: userProfile.picture
            }
        }, comment);

        return Comments.insert(_comment);
    },
    deleteComment(commentId) {
        if (Comments.findOne({ 'user._id': Meteor.userId() })) {
            return Comments.remove({ _id: commentId });
        }
    },
    updateGeoCode({ eventId, address }) {
        const geocode = Meteor.call('getGeoCode', address);

        if (geocode) {
            return Events.update({
                _id: eventId
            }, {
                $set: { geocode: geocode }
            });
        }
    },
    eventImageUpload(imageFileId, eventId) {
        Events.update(
            { _id: eventId },
            { $addToSet: { images: imageFileId } }
        );
    }
});