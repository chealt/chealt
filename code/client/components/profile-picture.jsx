ProfilePicture = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    profilePicturePath() {
        const googleData = this.props.user.services && this.props.user.services.google;
        const profilePicturePath = googleData && googleData.picture;
        
        return profilePicturePath;
    },
    render() {
        let style;
        const profilePicturePath = this.profilePicturePath();

        if (profilePicturePath) {
            style = { backgroundImage: 'url(' + profilePicturePath + ')' };
        } else {
            style = { display: 'none' }
        }

        const initial = this.props.user.profile.name.substring(0, 1);

        return (
            <span
                className='profile-picture'>
                <span className='initial'>{initial}</span>
                <span className='picture' style={style}></span>
            </span>
        );
    }
});