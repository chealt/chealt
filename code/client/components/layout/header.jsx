Header = React.createClass({
    render() {
        return (
            <div id="app-bar-container">
                <DrawerOpener
                    id="app-side-drawer"
                    toggleDrawer={this.props.toggleDrawer} />
                <HeaderProfile />
            </div>
        );
    }
});