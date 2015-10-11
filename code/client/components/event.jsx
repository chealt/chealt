Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div className="card">
                <h2 className="title separated">{this.props.event.name}</h2>
                <div className="content-header">
                    <div className="host">{this.props.event.host}</div>
                    <div className="time-container">
                        <div className="start">
                            <FormatTime date={this.props.event.start} />
                        </div>
                        <div className="end">
                            <FormatTime date={this.props.event.end} />
                        </div>
                    </div>
                    <div className="location">{this.props.event.location}</div>
                </div>
                <div className="guests-container">
                    <ul>
                        {this.props.event.guests.map(function (guest) {
                            return <li key={guest.name}>{guest.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
});