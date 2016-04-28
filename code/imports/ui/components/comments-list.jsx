import React, { Component } from 'react';
import ProfilePicture       from './profile-picture.jsx';
import GrowingTextarea      from './growing-textarea.jsx';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newComment: ''
        };
    }
    
    postComment() {
        Meteor.call('postComment', {
            itemType: this.props.itemType,
            itemId: this.props.itemId,
            message: this.state.newComment
        }, (error, result) => {
            if (result) {
                this.setState({
                    newComment: ''
                });
            }
        });
    }

    setNewComment(input) {
        this.setState({
            newComment: input
        });
    }

    deleteComment(commentId) {
        Meteor.call('deleteComment', commentId, (error, result) => {
            if (result && this.state.limit > this.props.commentsCount) {
                this.setState({
                    limit: this.props.commentsCount
                });
            }
        });
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
                            onChange={this.setNewComment}
                            value={this.state.newComment} />
                        <button
                            className='post button neutral upper'
                            onClick={this.postComment}>post</button>
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

    loadMore() {
        this.props.setCommentLimit(this.state.limit + 2);
    }

    loadMoreRender() {
        if (this.props.commentsCount > this.state.limit) {
            return (<LoadMore onClick={this.loadMore} />);
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
    itemId: React.PropTypes.string.isRequired,
    setCommentLimit: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    comments: React.PropTypes.array,
    commentsCount: React.PropTypes.number
};
