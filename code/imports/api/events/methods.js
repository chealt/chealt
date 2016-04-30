import { Meteor }   from 'meteor/meteor';
import { Events }   from './events.js';

const validateEmail = (email) => {
    let validEmail;

    if (email) {
        validEmail = email;
    }

    return validEmail;
};

const isAlreadyFriend = (email) => {
    return Meteor.users.findOne({
        _id: Meteor.userId(),
        'friends.email': email
    });
};

export const unattendEvent = (eventId) => {
    Events.update({ _id: eventId}, {
        $pull: {
            guests: {
                _id: Meteor.userId()
            }
        }
    });
};

export const attendEvent = (eventId) => {
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
};

export const updateGeoCode = ({ eventId, address }) => {
    const geocode = Meteor.call('getGeoCode', address);

    if (geocode) {
        return Events.update({
            _id: eventId
        }, {
            $set: { geocode: geocode }
        });
    }
};

/*Meteor.methods({
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
    eventImageUpload(imageFileId, eventId) {
        if (Events.findOne({ _id: eventId }).images) {
            Events.update(
                { _id: eventId },
                { $push: { images: imageFileId } }
            );
        } else {
            Events.update(
                { _id: eventId },
                { $set: { images: [imageFileId] } }
            );
        }
    },
    eventRemoveImage(imageFileId, eventId) {
        Events.update(
            { _id: eventId },
            { $pull: { images: imageFileId } }
        );
        Images.remove({ _id: imageFileId });
    },
    'event.editName': function (eventId, newEventName) {
        Events.update(
            { _id: eventId },
            { $set: { name: newEventName } }
        );
    },
    'users.inviteFriend': function (email) {
        const validEmail = validateEmail(email);

        if (!validEmail) {
            throw new Meteor.Error('invalid-email', 'Invalid invitation email!');
        }

        if (isAlreadyFriend(email)) {
            throw new Meteor.Error('already-friend', 'Already amongst friends!');
        }

        Meteor.users.update({ _id: Meteor.userId() }, {
            $addToSet: {
                friends: {
                    email: email,
                    status: 0
                }
            }
        });
    },
    'users.removeFriend': function (email) {
        Meteor.users.update({ _id: Meteor.userId() }, {
            $pull: {
                friends: {
                    email: email
                }
            }
        });
    }
});*/
