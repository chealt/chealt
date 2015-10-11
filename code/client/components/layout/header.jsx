Header = React.createClass({
    mixin: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    render() {
        return (
            <div id="app-bar-container">
                <DrawerOpener
                    id="app-side-drawer"
                    toggleDrawer={this.props.toggleDrawer} />
            </div>
        );
    }
});