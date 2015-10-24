Profile = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    profilePicturePath() {
        const googleData = this.props.user.services && this.props.user.services.google;
        const profilePicturePath = googleData && googleData.picture;
        
        return profilePicturePath;
    },
    render() {
        return (
            <div className='profile-container'>
                <ProfilePicture imagePath={this.profilePicturePath()} />
                <Logout />
            </div>
        );
    }
});
