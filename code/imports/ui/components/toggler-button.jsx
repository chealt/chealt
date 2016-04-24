TogglerButton = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        toggleFunction: React.PropTypes.func.isRequired
    },
    render() {
        return (
            <IconButton
                type={this.props.type}
                action={this.props.toggleFunction}
                additionalClasses={this.props.active ? 'active' : ''} />
        );
    }
});