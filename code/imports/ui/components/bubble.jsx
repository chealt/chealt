Bubble = React.createClass({
    propTypes: {
        position: React.PropTypes.string.isRequired,
        isShown: React.PropTypes.bool.isRequired
    },
    render() {
        let containerClasses = 'bubble ' + this.props.position;

        if (!this.props.isShown) {
            containerClasses += ' hidden';
        }

        return (
            <div className={containerClasses}>
                {this.props.content}
            </div>
        );
    }
});
