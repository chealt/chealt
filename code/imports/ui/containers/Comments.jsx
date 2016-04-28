import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import CommentsList         from '../components/comments-list.jsx';
import { Comments }         from '../../api/comments/comments.js';

export default createContainer(({ itemId, itemType, commentLimit }) => {
    const commentsHandle = Meteor.subscribe('comments');
    const filteredComments = Comments.find(
        {
            itemType: itemType,
            itemId: itemId
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
            itemId: itemId
        }
    ).count();

    return {
        user: Meteor.user(),
        comments: commentsHandle.ready() ? filteredComments : [],
        commentsCount: commentsHandle.ready() ? commentsCount : 0
    };
}, CommentsList);