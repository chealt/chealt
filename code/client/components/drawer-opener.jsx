DrawerOpener = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div className="drawer" htmlFor={this.props.id}>Drawer opener</div>
        );
    }
});