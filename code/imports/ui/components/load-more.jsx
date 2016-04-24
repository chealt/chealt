LoadMore = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },
    render() {
        let triggerClassName = 'load-more-trigger'

        if (this.props.position) {
            triggerClassName += ' ' + this.props.position;
        }

        return (
            <div className={triggerClassName}>
                <span className='load-more' onClick={this.props.onClick}>...</span>
            </div>
        );
    }
});