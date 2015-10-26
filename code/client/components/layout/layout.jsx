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
        let contentContainerClasses = 'content-container';
        const drawerItems = [
            { key: 0, name: 'Chealt' },
            { key: 1, name: 'Events' },
            { key: 2, name: 'Profile' }
        ];

        if (this.state.isDrawerOpen) {
            contentContainerClasses += ' background';
        }

        return (
            <div id='wrapper'>
                <Drawer
                    id='app-side-drawer'
                    items={drawerItems}
                    isDrawerOpen={this.state.isDrawerOpen}
                    toggleDrawer={this.toggleDrawer} />
                <div className={contentContainerClasses}>
                    <Header toggleDrawer={this.toggleDrawer} />
                    {this.props.content}
                </div>
                {this.props.footer}
            </div>
        );
    }
});