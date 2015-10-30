AnythingCloser = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },
    render() {
        return (
            <div className='anything-closer' onClick={this.props.onClick}></div>
        );
    }
})