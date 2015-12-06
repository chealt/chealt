EventTitle = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        start: React.PropTypes.object.isRequired,
        end: React.PropTypes.object.isRequired,
        activity: React.PropTypes.string,
        isEditable: React.PropTypes.bool,
        editEventName: React.PropTypes.func,
        editStartDate: React.PropTypes.func
    },
    sportsIcon() {
        if (this.props.activity) {
            return <SportsIcon activity={this.props.activity} />
        }
    },
    eventDate() {
        const startDate = this.props.start.toISOString().substring(0, 10);
        const endDate = this.props.end.toISOString().substring(0, 10);

        if (startDate == endDate) {
            const date = <FormatDate date={startDate} />;

            return (
                <Editable
                    type='date'
                    component={date}
                    value={startDate}
                    isEditable={this.props.isEditable}
                    editAction={this.props.editStartDate}
                    additionalClasses='event-date' />
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
                {this.eventDate()}
            </h2>
        );
    }
});