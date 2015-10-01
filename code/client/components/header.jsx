Header = React.createClass({
    mixin: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    render() {
        return (
            <header>Header</header>
        );
    }
});