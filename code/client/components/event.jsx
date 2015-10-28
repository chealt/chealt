Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    isAttending() {
        return this.props.event.guests.some((guest) => {
            return guest.user.email === this.data.currentUser.profile.email;
        });
    },
    attend() {
        Meteor.call('attendEvent', this.props.event._id);
    },
    unattend() {
        Meteor.call('unattendEvent', this.props.event._id);
    },
    attendButton() {
        if (this.data.currentUser) {
            const isAttending = this.isAttending();
            const buttonAction = isAttending ? this.unattend : this.attend;
            const buttonText = isAttending ? 'cannot go' : 'going';
            const buttonClasses = isAttending ? 'unattend RSVP upper' : 'attend RSVP upper';

            return (
                <MainButton
                    action={buttonAction}
                    text={buttonText}
                    additionalClasses={buttonClasses} />
            );
        }
    },
    guests() {
        if (this.props.event.guests.length) {
            return (
                <ul className='guests'>
                    {this.props.event.guests.map((guest) => {
                        return (
                            <li className='guest' key={guest.user.email}>
                                <ProfilePicture
                                    user={guest.user} />
                            </li>
                        );
                    })}
                </ul>
            );
        }
    },
    getDate() {
        const startDate = this.props.event.start.toISOString().substring(0, 10);
        const endDate = this.props.event.end.toISOString().substring(0, 10);

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
            <div className='card event'>
                <h2 className='title separated'>
                    <span className='name'>{this.props.event.name}</span>
                    {this.getDate()}
                </h2>
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