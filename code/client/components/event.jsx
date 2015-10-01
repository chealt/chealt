Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div className="event">
                <div className="name">{this.props.event.name}</div>
                <div className="start">{this.props.event.start.toTimeString()}</div>
                <div className="end">{this.props.event.end.toTimeString()}</div>
            </div>
        );
    }
});