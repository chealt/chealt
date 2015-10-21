Icon = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired
    },
    render() {
        var iconClass = 'icon-' + this.props.type;

        if (this.props.additionalClasses) {
            iconClass += ' ' + this.props.additionalClasses;
        }

        if (this.props.position) {
            iconClass += ' ' + this.props.position;
        }

        return (
            <span className={iconClass}></span>
        );
    }
});