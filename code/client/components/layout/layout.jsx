Layout = React.createClass({
    getInitialState() {
        return {
            isDrawerOpen: false,
            filter: ''
        };
    },
    filter(event) {
        this.setState({
            filter: event.target.value,
            filtered: !!event.target.value
        });
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
                    <Header
                        toggleDrawer={this.toggleDrawer}
                        filter={this.filter}
                        filtered={this.state.filtered} />
                    <Home 
                        filter={this.state.filter} />
                </div>
                {this.props.footer}
            </div>
        );
    }
});