Header = React.createClass({
    propTypes: {
        toggleDrawer: React.PropTypes.func.isRequired,
        filter: React.PropTypes.func.isRequired
    },
    render() {
        const searchIconClass = this.props.filtered ? 'filtered' : '';

        return (
            <div id='app-bar-container' className='shadow'>
                <div className='container'>
                    <DrawerOpener
                        id='app-side-drawer'
                        toggleDrawer={this.props.toggleDrawer} />
                </div>
                <div id='filter-container' className='container'>
                    <Icon type='search' additionalClasses={searchIconClass} />
                    <input 
                        id='header-filter'
                        placeholder='filter'
                        aria-label='filter'
                        onChange={this.props.filter}
                        no-focus />
                </div>
                <div className='container'>
                    <HeaderProfile />
                </div>
            </div>
        );
    }
});