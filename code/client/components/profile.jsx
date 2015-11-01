Profile = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            isBubbleShown: false
        };
    },
    toggleBubble() {
        this.setState({
            isBubbleShown: !this.state.isBubbleShown
        });
    },
    closeBubble() {
        this.setState({
            isBubbleShown: false
        });
    },
    anythingCloser() {
        if (this.state.isBubbleShown) {
            return <AnythingCloser onClick={this.closeBubble} />;
        }
    },
    getBubbleContent() {
        return (
            <div className='profile-bubble-content'>
                <ProfileInfo
                    user={this.props.user} />
                <Logout />
            </div>
        );
    },
    render() {
        return (
            <div className='profile-container bubble-container'>
                <ProfilePicture
                    user={this.props.user.profile}
                    onClick={this.toggleBubble} />
                <BubbleArrow
                    position='below'
                    isShown={this.state.isBubbleShown} />
                <Bubble
                    position='below'
                    isShown={this.state.isBubbleShown}
                    content={this.getBubbleContent()} />
                {this.anythingCloser()}
            </div>
        );
    }
});
