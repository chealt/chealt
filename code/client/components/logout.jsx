Logout = React.createClass({
    logout() {
        Meteor.logout();
    },
    render() {
        return (
            <MainButton
                action={this.logout}
                text='logout'
                additionalClasses='logout upper invert' />
        );
    }
});