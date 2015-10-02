const ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();

const { AppBar, TextField } = mui;

Header = React.createClass({
    mixin: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    render() {
        return (
            <div id="app-bar-container">
                <AppBar
                    title={<TextField hintText="Search" />} />
            </div>
        );
    }
});