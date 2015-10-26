Profile = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div className='profile-container'>
                <ProfilePicture
                    user={this.props.user} />
                <Logout />
            </div>
        );
    }
});
