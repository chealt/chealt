Layout = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        content: React.PropTypes.func.isRequired
    },
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
        
        if (this.state.isDrawerOpen) {
            contentContainerClasses += ' background';
        }

        return (
            <div id='wrapper'>
                <Drawer
                    id='app-side-drawer'
                    items={this.props.menuItems}
                    isDrawerOpen={this.state.isDrawerOpen}
                    toggleDrawer={StateToggler.bind(this, 'isDrawerOpen')} />
                <div className={contentContainerClasses}>
                    <Header
                        toggleDrawer={StateToggler.bind(this, 'isDrawerOpen')}
                        filter={this.filter}
                        filtered={this.state.filtered} />
                    {this.props.content(this.state.filter)}
                </div>
                <Footer />
                {this.anythingCloser()}
            </div>
        );
    }
});