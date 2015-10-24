HeaderProfile = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    getModule() {
        if (this.data.currentUser) {
            return <Profile user={this.data.currentUser} />;
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