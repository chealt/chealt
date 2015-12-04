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
    render() {
        return (
            <h2 className='title'>
                {this.sportsIcon()}
                <span className='name'>{this.props.name}</span>
                {this.getDate()}
            </h2>
        );
    }
});