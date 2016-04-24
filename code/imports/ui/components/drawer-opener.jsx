DrawerOpener = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <button
                onClick={this.props.toggleDrawer}
                className='drawer-opener' htmlFor={this.props.id}>
                <Icon type='menu' />
            </button>
        );
    }
});