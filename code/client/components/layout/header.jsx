Header = React.createClass({
    render() {
        return (
            <div id="app-bar-container" className='shadow'>
                <DrawerOpener
                    id='app-side-drawer'
                    toggleDrawer={this.props.toggleDrawer} />
                <HeaderProfile />
            </div>
        );
    }
});