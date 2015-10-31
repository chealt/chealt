CommentsList = React.createClass({
    propTypes: {
        itemType: React.PropTypes.string.isRequired,
        itemId: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            limit: 10,
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
                }).fetch()
        };
    },
    postComment() {
        Meteor.call('postComment', {
            itemType: this.props.itemType,
            itemId: this.props.itemId,
            message: this.state.newComment
        });
    },
    setNewComment(input) {
        this.setState({
            newComment: input
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
                            onChange={this.setNewComment} />
                        <button
                            className='post button neutral upper'
                            onClick={this.postComment}>post</button>
                    </div>
                </li>
            );
        }
    },
    render() {
        return (
            <ul className='comments-container separated top'>
                {this.data.comments.map((comment) => {
                    return (
                        <li key={comment._id}>
                            <ProfilePicture user={comment.user} />
                            <div className='message-container'>
                                <div className='comment-container'>
                                    {comment.message}
                                </div>
                                <button
                                    className='delete button neutral upper'
                                    onClick={this.deleteComment}>delete</button>
                            </div>
                        </li>
                    );
                })}
                {this.newComment()}
            </ul>
        );
    }
});