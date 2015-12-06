Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            isCommentsShown: false,
            isMapShown: false,
            isActivityListShown: false,
            isAdminMode: false
        };
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user(),
            isOwnEvent: Meteor.userId() === this.props.event.host._id
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
    isEditable() {
        return this.state.isAdminMode && this.data.isOwnEvent;
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
    activityList() {
        if (this.state.isActivityListShown) {
            return (
                <ActivityList items={this.props.event.activityList} />
            );
        }
    },
    removeImage(fileId) {
        if (this.isEditable()) {
            Meteor.call('eventRemoveImage', fileId, this.props.event._id);
        }
    },
    images() {
        if (this.props.event.images && this.props.event.images.length) {
            return (
                <ImageList
                    imageIds={this.props.event.images}
                    isEditable={this.isEditable()}
                    removeImage={this.removeImage} />
            );
        }
    },
    imageUploader() {
        if (this.isEditable()) {
            return (
                <ImageUploader
                    successCallback={this.imageUploadSuccess} />
            );
        }
    },
    imageUploadSuccess(fileId) {
        Meteor.call('eventImageUpload', fileId, this.props.event._id);
    },
    description() {
        if (this.props.event.description) {
            return (
                <div className='description'>{this.props.event.description}</div>
            );
        }
    },
    editEventName(newEventName, callback) {
        if (this.isEditable) {
            Meteor.call('event.editName', this.props.event._id, newEventName, function (error, result) {
                if (!error) {
                    callback();
                }
            });
        }
    },
    editStartDate(newEventStartDate, callback) {
        if (this.isEditable) {
            console.log(newEventStartDate);
            /*Meteor.call('event.editStartDate', this.props.event._id, newEventStartDate, function (error, result) {
                if (!error) {
                    callback();
                }
            });*/
            callback();
        }
    },
    render() {
        return (
            <div className='card event'>
                <EventTitle
                    name={this.props.event.name}
                    activity={this.props.event.activity}
                    start={this.props.event.start}
                    end={this.props.event.end}
                    isEditable={this.isEditable()}
                    editEventName={this.editEventName}
                    editStartDate={this.editStartDate} />
                <EventHeader
                    hostName={this.props.event.host.name}
                    location={this.props.event.location}
                    start={this.props.event.start}
                    end={this.props.event.end} />
                {this.images()}
                {this.imageUploader()}
                {this.description()}
                <Guests 
                    guests={this.props.event.guests}
                    attendMethod={this.attend}
                    unattendMethod={this.unattend} />
                {this.activityList()}
                {this.commentsList()}
                <Map
                    geocode={this.props.event.geocode}
                    isMapShown={this.state.isMapShown}
                    mapId={this.props.event._id} />
                <EventFooter
                    guests={this.props.event.guests}
                    maxAttendance={this.props.event.maxAttendance}
                    minAttendance={this.props.event.minAttendance}
                    activityList={this.props.event.activityList}
                    isActivityListShown={this.state.isActivityListShown}
                    toggleActivityList={StateToggler.bind(this, 'isActivityListShown')}
                    isMapShown={this.state.isMapShown}
                    toggleMap={StateToggler.bind(this, 'isMapShown')}
                    isCommentsShown={this.state.isCommentsShown}
                    toggleComments={StateToggler.bind(this, 'isCommentsShown')}
                    isOwnEvent={this.data.isOwnEvent}
                    isAdminMode={this.state.isAdminMode}
                    toggleAdminMode={StateToggler.bind(this, 'isAdminMode')} />
            </div>
        );
    }
});