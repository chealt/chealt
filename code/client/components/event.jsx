Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            isCommentsShown: false,
            isMapShown: false,
            isMapLoaded: false
        };
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user(),
            isGoogleMapsLoaded: GoogleMaps.loaded()
        };
    },
    componentDidMount() {
        if (!this.props.event.geocode) {
            Meteor.call('updateGeoCode', {
                eventId: this.props.event._id,
                address: this.props.event.location
            });
        }
    },
    isAttending() {
        return this.props.event.guests.some((guest) => {
            return guest._id === this.data.currentUser._id;
        });
    },
    attend() {
        Meteor.call('attendEvent', this.props.event._id);
    },
    unattend() {
        Meteor.call('unattendEvent', this.props.event._id);
    },
    sportsIcon() {
        if (this.props.event.activity) {
            return <SportsIcon activity={this.props.event.activity} />
        }
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
                <ProfileList
                    profileList={this.props.event.guests}
                    containerClass='guests' />
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
    toggleComments() {
        this.setState({
            isCommentsShown: !this.state.isCommentsShown
        });
    },
    commentsList() {
        if (this.state.isCommentsShown) {
            return (
                <CommentsList
                    itemType='event'
                    itemId={this.props.event._id} />
            );
        }
    },
    toggleCommentsRender() {
        let additionalClasses;

        if (this.state.isCommentsShown) {
            additionalClasses = 'active';
        }

        return (
            <IconButton
                type='bubbles4'
                action={this.toggleComments}
                additionalClasses={additionalClasses} />
        );
    },
    attendance() {
        let attendance = this.props.event.guests.length + '';

        if (this.props.event.limit) {
            attendance += '/' + this.props.event.limit;
        }

        return (
            <span className='attendance'>{attendance}</span>
        );
    },
    loadEventMap() {
        const latitude = this.props.event.geocode.latitude;
        const longitude = this.props.event.geocode.longitude;
        const mapId = 'map-' + this.props.event._id;

        GoogleMaps.create({
            name: mapId,
            element: this._map.getDOMNode(),
            options: {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 16
            }
        });

        GoogleMaps.ready(mapId, (map) => {
            const marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });

        this.setState({
            isMapLoaded: true
        });
    },
    toggleMapRender() {
        let additionalClasses;

        if (this.state.isMapShown) {
            additionalClasses = 'active';
        }

        return (
            <IconButton
                type='map'
                action={this.toggleMap}
                additionalClasses={additionalClasses} />
        );
    },
    toggleMap() {
        this.setState({
            isMapShown: !this.state.isMapShown
        }, () => {
            if (!this.state.isMapLoaded) {
                this.loadEventMap();
            }
        });
    },
    eventMap() {
        let classes = 'map';

        if (this.state.isMapShown) {
            classes += ' loaded';
        }

        return (
            <div className={classes} ref={(ref) => this._map = ref}></div>
        );
    },
    render() {
        return (
            <div className='card event'>
                <h2 className='title'>
                    {this.sportsIcon()}
                    <span className='name'>{this.props.event.name}</span>
                    {this.getDate()}
                </h2>
                <div className='content-header row equal separated vertical'>
                    <div className='host'>
                        <Icon type='user' position='before' />
                        <span className='text'>host: {this.props.event.host.name}</span>
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
                {this.commentsList()}
                {this.eventMap()}
                <div className='footer row equal'>
                    <div className='figures-container'>
                        {this.attendance()}
                    </div>
                    <div className='controls-container'>
                        {this.toggleMapRender()}
                        {this.toggleCommentsRender()}
                    </div>
                </div>
            </div>
        );
    }
});