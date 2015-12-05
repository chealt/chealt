EventTitle = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        start: React.PropTypes.object.isRequired,
        end: React.PropTypes.object.isRequired
    },
    sportsIcon() {
        if (this.props.activity) {
            return <SportsIcon activity={this.props.activity} />
        }
    },
    getDate() {
        const startDate = this.props.start.toISOString().substring(0, 10);
        const endDate = this.props.end.toISOString().substring(0, 10);

        if (startDate == endDate) {
            return (
                <FormatDate date={startDate} />
            );
        } else {
            return (
                <span className='date'>
                    <FormatDate date={startDate} />
                    <span className='divider'> - </span>
                    <FormatDate date={endDate} />
                </span>
            );
        }
    },
    eventName() {
        const eventName = <span>{this.props.name}</span>;

        return (
            <Editable
                component={eventName}
                value={this.props.name}
                isEditable={this.props.isEditable}
                editAction={this.props.editEventName}
                additionalClasses='name' />
        );
    },
    render() {
        return (
            <h2 className='title'>
                {this.sportsIcon()}
                {this.eventName()}
                {this.getDate()}
            </h2>
        );
    }
});