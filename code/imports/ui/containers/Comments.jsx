import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import CommentsList         from '../components/comments-list.jsx';
import { Comments }         from '../../api/comments/comments.js';

export default createContainer(({ itemId, itemType, commentLimit, showNotification }) => {
    const commentsHandle = Meteor.subscribe('comments');
    const filteredComments = Comments.find(
        {
            itemType: itemType,
            itemId: itemId,
            $or: [ { deleted: { $exists: false } }, { deleted: false } ]
        },
        {
            sort: {
                createdOn: -1
            },
            limit: commentLimit
        }
    ).fetch();
    const commentsCount = Comments.find(
        {
            itemType: itemType,
            itemId: itemId,
            $or: [ { deleted: { $exists: false } }, { deleted: false } ]
        }
    ).count();

    return {
        user: Meteor.user(),
        comments: commentsHandle.ready() ? filteredComments : [],
        commentsCount: commentsHandle.ready() ? commentsCount : 0,
        limit: commentLimit,
        showNotification: showNotification
    };
}, CommentsList);