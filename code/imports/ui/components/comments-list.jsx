import React            from 'react';
import ProfilePicture   from './profile-picture.jsx';
import GrowingTextarea  from './growing-textarea.jsx';
import LoadMore         from './load-more.jsx';
import {
    postComment,
    deleteComment,
    revertDeleteComment
} from '../../api/comments/methods.js';

let textInput;

const callPostComment = (itemType, itemId) => {
    postComment.call({
        itemType: itemType,
        itemId: itemId,
        message: textInput.state.value
    }, (error, result) => {
        if (result) {
            textInput.resetValue();
        }
    });
};

const loadMoreRender = (limit, commentsCount, loadMore) => {
    if (limit < commentsCount) {
        return (<LoadMore onClick={loadMore} />);
    }
};

const newComment = (user, itemType, itemId) => {
    if (user) {
        return (
            <li className='new-comment-container separated top'>
                <ProfilePicture user={user.profile} />
                <div className='message-container form-container'>
                    <GrowingTextarea
                        containerClasses='comment-container'
                        additionalClasses='comment neutral'
                        name='new-comment'
                        placeholder='your comment...'
                        ref={(input) => textInput = input}
                        value='' />
                    <button
                        className='post button neutral upper'
                        onClick={callPostComment.bind(null, itemType, itemId)}>post</button>
                </div>
            </li>
        );
    }
};

const deleteButton = (userId, comment, showNotification) => {
    if (comment.user._id === userId) {
        return (
            <button
                className='delete button neutral upper'
                onClick={callDeleteComment.bind(null, comment._id, showNotification)}>delete</button>
        );
    }
};

const callDeleteComment = (commentId, showNotification) => {
    deleteComment.call(commentId, showRevertDeleteCommentNotification.bind(null, commentId, showNotification));
};

const showRevertDeleteCommentNotification = (commentId, showNotification, error, result) => {
    if (result) {
        showNotification({
            text: 'You successfully deleted your comment!',
            undoMethod: () => {
                revertDeleteComment.call(commentId);
            }
        });
    }
};

export default CommentsList = ({ itemType, itemId, limit, commentsCount, loadMore, comments, user, showNotification }) => (
    <div className='load-more-container separated top'>
        {loadMoreRender(limit, commentsCount, loadMore)}
        <ul className='comments-container'>
            {comments.reverse().map((comment) => {
                return (
                    <li key={comment._id}>
                        <ProfilePicture user={comment.user} />
                        <div className='message-container'>
                            <div className='comment-container'>
                                {comment.message}
                            </div>
                            {deleteButton(user._id, comment, showNotification)}
                        </div>
                    </li>
                );
            })}
            {newComment(user, itemType, itemId)}
        </ul>
    </div>
);

CommentsList.propTypes = {
    itemType: React.PropTypes.string.isRequired,
    itemId: React.PropTypes.object.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    comments: React.PropTypes.array,
    commentsCount: React.PropTypes.number,
    showNotification: React.PropTypes.func
};
