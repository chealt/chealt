IconButton = React.createClass({
    propTypes: {
        action: React.PropTypes.func.isRequired,
        type: React.PropTypes.string.isRequired
    },
    render() {
        let classNames = 'button';

        if (this.props.additionalClasses) {
            classNames += ' ' + this.props.additionalClasses;
        }

        return (
            <button
                className={classNames}
                onClick={this.props.action} >
                <Icon type={this.props.type} />
                {this.props.text}
            </button>
        );
    }
});