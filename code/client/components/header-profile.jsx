HeaderProfile = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    getModule() {
        if (this.data.currentUser) {
            let adminToggleClassName = 'centered';

            if (this.props.isAdminMode) {
                adminToggleClassName += ' alert';
            }

            return (
                <div>
                    <IconButton
                        type='cog'
                        action={this.props.toggleAdminMode}
                        additionalClasses={adminToggleClassName} />
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