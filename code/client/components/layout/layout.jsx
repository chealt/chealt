Layout = React.createClass({
    getInitialState() {
        return {
            isDrawerOpen: false
        };
    },
    toggleDrawer() {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        });
    },
    render() {
        var drawerItems = [
                { key: 0, name: 'Home' }
            ];

        return (
            <div id="wrapper">
                <Drawer
                    id="app-side-drawer"
                    items={drawerItems}
                    isDrawerOpen={this.state.isDrawerOpen}
                    toggleDrawer={this.toggleDrawer} />
                <Header toggleDrawer={this.toggleDrawer} />
                {this.props.content}
                {this.props.footer}
            </div>
        );
    }
});