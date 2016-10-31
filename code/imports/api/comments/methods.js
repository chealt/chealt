import { Meteor }   from 'meteor/meteor';
import { Comments } from './comments.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const postComment = new ValidatedMethod({
    name: 'comments.postComment',
    validate(comment) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('comments.postComment.unathorized', 'You must be logged in to write a comment!');
        }
    },
    run(comment) {
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
    }
});

export const deleteComment = new ValidatedMethod({
    name: 'comments.deleteComment',
    validate(commentId) {
        if (!commentId) {
            throw new Meteor.Error('comments.deleteComment.missingId', 'No comment id provided for deletion!');
        }

        const comment = Comments.findOne({ _id: commentId, 'user._id': Meteor.userId() });

        if (!comment) {
            throw new Meteor.Error('comments.deleteComment.unathorized', 'Not allowed to delete comment!');
        }
    },
    run(commentId) {
        return Comments.update({ _id: commentId }, { $set: { deleted: true } });
    }
});

export const revertDeleteComment = new ValidatedMethod({
    name: 'comments.revertDeleteComment',
    validate(commentId) {
        if (!commentId) {
            throw new Meteor.Error('comments.revertDeleteComment.missingId', 'No comment id provided for undo delete!');
        }

        const comment = Comments.findOne({ _id: commentId, 'user._id': Meteor.userId() });

        if (!comment) {
            throw new Meteor.Error('comments.revertDeleteComment.unathorized', 'Not allowed to undo delete!');
        }
    },
    run(commentId) {
        return Comments.update({ _id: commentId }, { $set: { deleted: false } });
    }
});
