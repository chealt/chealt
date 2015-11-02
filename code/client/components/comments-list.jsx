CommentsList = React.createClass({
    propTypes: {
        itemType: React.PropTypes.string.isRequired,
        itemId: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            limit: 2,
            newComment: ''
        };
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user(),
            comments: Comments.find({
                    itemType: this.props.itemType,
                    itemId: this.props.itemId
                }, {
                    sort: {
                        createdOn: -1
                    },
                    limit: this.state.limit
                }).fetch(),
            commentsCount: Comments.find({
                    itemType: this.props.itemType,
                    itemId: this.props.itemId
                }).count()
        };
    },
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
    },
    setNewComment(input) {
        this.setState({
            newComment: input
        });
    },
    deleteComment(commentId) {
        Meteor.call('deleteComment', commentId, (error, result) => {
            if (result && this.state.limit > this.data.commentsCount) {
                this.setState({
                    limit: this.data.commentsCount
                });
            }
        });
    },
    newComment() {
        if (this.data.currentUser) {
            return (
                <li className='new-comment-container separated top'>
                    <ProfilePicture user={this.data.currentUser.profile} />
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
    },
    deleteButton(comment) {
        if (comment.user._id === Meteor.userId()) {
            return (
                <button
                    className='delete button neutral upper'
                    onClick={this.deleteComment.bind(this, comment._id)}>delete</button>
            );
        }
    },
    loadMore() {
        this.setState({
            limit: this.state.limit + 2
        });
    },
    loadMoreRender() {
        if (this.data.commentsCount > this.state.limit) {
            return (<LoadMore onClick={this.loadMore} />);
        }
    },
    render() {
        return (
            <div className='load-more-container separated top'>
                {this.loadMoreRender()}
                <ul className='comments-container'>
                    {this.data.comments.reverse().map((comment) => {
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
});