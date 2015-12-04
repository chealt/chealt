Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            isCommentsShown: false,
            isMapShown: false,
            isActivityListShown: false
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
    toggleMap() {
        this.setState({
            isMapShown: !this.state.isMapShown
        });
    },
    activityList() {
        if (this.state.isActivityListShown) {
            return (
                <ActivityList items={this.props.event.activityList} />
            );
        }
    },
    toggleActivityList() {
        this.setState({
            isActivityListShown: !this.state.isActivityListShown
        });
    },
    removeImage(fileId) {
        if (this.props.isAdminMode && this.data.isOwnEvent) {
            Meteor.call('eventRemoveImage', fileId, this.props.event._id);
        }
    },
    images() {
        if (this.props.event.images && this.props.event.images.length) {
            return (
                <ImageList
                    imageIds={this.props.event.images}
                    isAdmin={this.props.isAdminMode && this.data.isOwnEvent}
                    removeImage={this.removeImage} />
            );
        }
    },
    imageUploader() {
        if (this.props.isAdminMode && this.data.isOwnEvent) {
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
    render() {
        return (
            <div className='card event'>
                <EventTitle
                    name={this.props.event.name}
                    activity={this.props.event.activity}
                    start={this.props.event.start}
                    end={this.props.event.end} />
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
                    toggleActivityList={this.toggleActivityList}
                    isMapShown={this.state.isMapShown}
                    toggleMap={this.toggleMap}
                    isCommentsShown={this.state.isCommentsShown}
                    toggleComments={this.toggleComments} />
            </div>
        );
    }
});