Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            isCommentsShown: false,
            showMap: false,
            showActivityList: false
        };
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
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
    getTime() {
        if (this.props.event.start.getTime() !== this.props.event.end.getTime()) {
            return (
                <div className='time-container row--m equal'>
                    <div className='start'>
                        <FormatTime date={this.props.event.start} />
                    </div>
                    <Icon type='clock3' additionalClasses='clock' />
                    <div className='end'>
                        <FormatTime date={this.props.event.end} />
                    </div>
                </div>
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
    commentsToggler() {
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
    mapToggler() {
        let additionalClasses;

        if (this.state.showMap) {
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
            showMap: !this.state.showMap
        });
    },
    activityList() {
        if (this.state.showActivityList) {
            return (
                <ActivityList items={this.props.event.activityList} />
            );
        }
    },
    activityListToggler() {
        if (this.props.event.activityList) {
            let additionalClasses;

            if (this.state.showActivityList) {
                additionalClasses = 'active';
            }

            return (
                <IconButton
                    type='list22'
                    action={this.toggleActivityList}
                    additionalClasses={additionalClasses} />
            );
        }
    },
    toggleActivityList() {
        this.setState({
            showActivityList: !this.state.showActivityList
        });
    },
    render() {
        return (
            <div className='card event'>
                <h2 className='title'>
                    {this.sportsIcon()}
                    <span className='name'>{this.props.event.name}</span>
                    {this.getDate()}
                </h2>
                <div className='content-header row--m equal separated vertical'>
                    <div className='host'>
                        <Icon type='user' position='before' />
                        <span className='text'>host: {this.props.event.host.name}</span>
                    </div>
                    {this.getTime()}
                    <div className='location'>
                        <Icon type='earth2' position='before' />
                        {this.props.event.location}
                    </div>
                </div>
                <Guests 
                    guests={this.props.event.guests}
                    attendMethod={this.attend}
                    unattendMethod={this.unattend} />
                {this.activityList()}
                {this.commentsList()}
                <Map
                    geocode={this.props.event.geocode}
                    showMap={this.state.showMap}
                    mapId={this.props.event._id} />
                <div className='footer row equal'>
                    <div className='figures-container'>
                        {this.attendance()}
                    </div>
                    <div className='controls-container'>
                        {this.activityListToggler()}
                        {this.mapToggler()}
                        {this.commentsToggler()}
                    </div>
                </div>
            </div>
        );
    }
});