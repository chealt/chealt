Drawer = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired
    },
    render() {
        const classNames = 'side-drawer' + (this.props.isDrawerOpen ? ' open' : '');

        return (
            <div id={this.props.id} className={classNames}>
                <DrawerOpener
                    id='app-side-drawer'
                    toggleDrawer={this.props.toggleDrawer} />
                <ul className='items'>
                    {this.props.items.map(function (item) {
                        return <li className='item' key={item.key}>{item.name}</li>;
                    })}
                </ul>
            </div>
        );
    }
});