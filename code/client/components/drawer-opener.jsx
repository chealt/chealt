DrawerOpener = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <button
                onClick={this.props.toggleDrawer}
                className="drawer" htmlFor={this.props.id}>
                Drawer opener
            </button>
        );
    }
});