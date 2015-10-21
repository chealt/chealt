Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div className='card event'>
                <h2 className='title separated'>{this.props.event.name}</h2>
                <div className='content-header row equal'>
                    <div className='host'>
                        <Icon type='user' position='before' />
                        <span className='text'>host: {this.props.event.host}</span>
                    </div>
                    <div className='time-container row equal'>
                        <div className='start'>
                            <FormatTime date={this.props.event.start} />
                        </div>
                        <Icon type='clock3' additionalClasses='clock' />
                        <div className='end'>
                            <FormatTime date={this.props.event.end} />
                        </div>
                    </div>
                    <div className='location'>
                        <Icon type='earth2' position='before' />
                        {this.props.event.location}
                    </div>
                </div>
                <div className='guests-container'>
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