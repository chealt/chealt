Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    isAttending() {
        return this.props.event.guests.some((guest) => {
            return guest.user._id === Meteor.userId();
        });
    },
    attend() {
        Meteor.call('attendEvent', this.props.event._id);
    },
    unattend() {
        Meteor.call('unattendEvent', this.props.event._id);
    },
    attendButton() {
        const isAttending = this.isAttending();
        const buttonAction = isAttending ? this.unattend : this.attend;
        const buttonText = isAttending ? 'unattend' : 'attend';
        const buttonClasses = isAttending ? 'unattend RSVP upper' : 'attend RSVP upper';

        return (
            <MainButton
                action={buttonAction}
                text={buttonText}
                additionalClasses={buttonClasses} />
        );
    },
    guests() {
        if (this.props.event.guests.length) {
            return (
                <ul className='guests'>
                    {this.props.event.guests.map((guest) => {
                        return (
                            <li className='guest' key={guest.user._id}>
                                <ProfilePicture
                                    user={guest.user} />
                            </li>
                        );
                    })}
                </ul>
            );
        }
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
                    {this.guests()}
                    {this.attendButton()}
                </div>
            </div>
        );
    }
});