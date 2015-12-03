HeaderProfile = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    getModule() {
        if (this.data.currentUser) {
            return (
                <div>
                    <IconButton
                        type='cog'
                        action={this.props.toggleAdminMode}
                        additionalClasses='centered' />
                    <Profile user={this.data.currentUser} />
                </div>
            );
        } else {
            return <Login />;
        }
    },
    render() {
        return (
            <div id='header-profile-container'>{this.getModule()}</div>
        );
    }
});