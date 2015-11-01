LoadMore = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },
    render() {
        return (
            <div className='load-more-trigger'>
                <span className='load-more' onClick={this.props.onClick}>...</span>
            </div>
        );
    }
});