Login = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    render() {
        return <span>Hello {this.data.currentUser.username}!</span>;
    }
});