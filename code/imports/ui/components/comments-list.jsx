import React, { Component } from 'react';
import ProfilePicture       from './profile-picture.jsx';
import GrowingTextarea      from './growing-textarea.jsx';
import LoadMore             from './load-more.jsx';
import {
    postComment,
    deleteComment
} from '../../api/comments/methods.js';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);
    }
    
    postComment() {
        postComment.call({
            itemType: this.props.itemType,
            itemId: this.props.itemId,
            message: this.textInput.state.value
        }, (error, result) => {
            if (result) {
                this.textInput.resetValue();
            }
        });
    }

    loadMoreRender() {
        if (this.props.limit < this.props.commentsCount) {
            return (<LoadMore onClick={this.props.loadMore} />);
        }
    }

    deleteComment(commentId) {
        deleteComment.call(commentId);
    }

    newComment() {
        if (this.props.user) {
            return (
                <li className='new-comment-container separated top'>
                    <ProfilePicture user={this.props.user.profile} />
                    <div className='message-container form-container'>
                        <GrowingTextarea
                            containerClasses='comment-container'
                            additionalClasses='comment neutral'
                            name='new-comment'
                            placeholder='your comment...'
                            ref={(input) => this.textInput = input}
                            value='' />
                        <button
                            className='post button neutral upper'
                            onClick={this.postComment.bind(this)}>post</button>
                    </div>
                </li>
            );
        }
    }

    deleteButton(comment) {
        if (comment.user._id === this.props.user._id) {
            return (
                <button
                    className='delete button neutral upper'
                    onClick={this.deleteComment.bind(this, comment._id)}>delete</button>
            );
        }
    }

    render() {
        return (
            <div className='load-more-container separated top'>
                {this.loadMoreRender()}
                <ul className='comments-container'>
                    {this.props.comments.reverse().map((comment) => {
                        return (
                            <li key={comment._id}>
                                <ProfilePicture user={comment.user} />
                                <div className='message-container'>
                                    <div className='comment-container'>
                                        {comment.message}
                                    </div>
                                    {this.deleteButton(comment)}
                                </div>
                            </li>
                        );
                    })}
                    {this.newComment()}
                </ul>
            </div>
        );
    }
};

CommentsList.propTypes = {
    itemType: React.PropTypes.string.isRequired,
    itemId: React.PropTypes.object.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    comments: React.PropTypes.array,
    commentsCount: React.PropTypes.number
};
