Layout = React.createClass({
    getInitialState() {
        return {
            isDrawerOpen: false,
            filter: '',
            filtered: false
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
    closeDrawer() {
        this.setState({
            isDrawerOpen: false
        });
    },
    anythingCloser() {
        if (this.state.isDrawerOpen) {
            return <AnythingCloser onClick={this.closeDrawer} />;
        }
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
            <html>
                <head>
                    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='theme-color' content='#337ab7' />
                    <title>Chealt</title>
                </head>
                <body>
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
                        {this.anythingCloser()}
                    </div>
                </body>
            </html>
        );
    }
});