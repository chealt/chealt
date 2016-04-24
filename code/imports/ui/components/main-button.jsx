MainButton = React.createClass({
    propTypes: {
        action: React.PropTypes.func.isRequired,
        text: React.PropTypes.string.isRequired
    },
    render() {
        let classNames = 'button main';

        if (this.props.additionalClasses) {
            classNames += ' ' + this.props.additionalClasses;
        }

        return (
            <button
                className={classNames}
                onClick={this.props.action} >
                {this.props.text}
            </button>
        );
    }
});