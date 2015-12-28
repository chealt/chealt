Drawer = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired
    },
    render() {
        let className = 'side-drawer shadow';

        if (this.props.isDrawerOpen) {
            className += ' open';
        }

        return (
            <div id={this.props.id} className={className}>
                <DrawerOpener
                    id='app-side-drawer'
                    toggleDrawer={this.props.toggleDrawer} />
                <ul className='items'>
                    {this.props.items.map(function (item) {
                        return (
                            <li key={item.key}>
                                <a className='item' href={item.link}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});