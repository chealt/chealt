import { Meteor }   from 'meteor/meteor';
import { Comments } from './comments.js';

export const postComment = (comment) => {
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
};

/*export const deleteComment = (commentId) => {
    if (Comments.findOne({ 'user._id': Meteor.userId() })) {
        return Comments.remove({ _id: commentId });
    }
};*/

export const deleteComment = new ValidatedMethod({
    name: 'comments.deleteComment',
    validate(commentId) {
        return commentId && Comments.findOne({ 'user._id': Meteor.userId() });
    },
    run(commentId) {
        return Comments.remove({ _id: commentId });
    }
});
