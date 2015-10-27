Header = React.createClass({
    render() {
        return (
            <div id="app-bar-container" className='shadow'>
                <div className='container'>
                    <DrawerOpener
                        id='app-side-drawer'
                        toggleDrawer={this.props.toggleDrawer} />
                </div>
                <div id='filter-container' className='container'>
                    <Icon type='search' />
                    <input 
                        id='header-filter'
                        placeholder='Filter'
                        aria-label='Filter'
                        no-focus />
                </div>
                <div className='container'>
                    <HeaderProfile />
                </div>
            </div>
        );
    }
});