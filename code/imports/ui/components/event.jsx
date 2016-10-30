import React, { Component }             from 'react';

import EventTitle                       from './event-title.jsx';
import EventHeader                      from './event-header.jsx';
import Guests                           from '../containers/Guests.jsx';
import EventFooter                      from './event-footer.jsx';
import StateToggler                     from './mixins/state-toggler.jsx';
import GoogleMap                        from './google-map.jsx';
import Comments                         from '../containers/Comments.jsx';
import ImageUploader                    from './image-uploader.jsx';

import {
    attendEvent,
    unattendEvent,
    updateGeoCode
} from '../../api/events/methods.js';

export default class Event extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isCommentsShown: false,
            isMapShown: false,
            isActivityListShown: false,
            isAdminMode: false,
            commentLimit: 2
        };
    }

    isOwnEvent() {
        return Meteor.userId() === this.props.event.host._id;
    }

    componentDidMount() {
        if (!this.props.event.geocode) {
            updateGeoCode.call({
                eventId: this.props.event._id,
                address: this.props.event.location
            });
        }
    }

    attend() {
        attendEvent.call(this.props.event._id);
    }

    unattend() {
        unattendEvent.call(this.props.event._id);
    }

    isEditable() {
        return this.state.isAdminMode && this.isOwnEvent();
    }

    commentsList() {
        if (this.state.isCommentsShown) {
            return (
                <Comments
                    itemType='event'
                    itemId={this.props.event._id}
                    commentLimit={this.state.commentLimit}
                    loadMore={this.loadMoreComments.bind(this)} />
            );
        }
    }

    loadMoreComments() {
        this.setState({
            commentLimit: this.state.commentLimit + 2
        });
    }

    googleMap() {
        if (this.props.event.geocode) {
            return (
                <GoogleMap
                    geocode={this.props.event.geocode}
                    isMapShown={this.state.isMapShown}
                    mapId={this.props.event._id.valueOf()} />
            );
        }
    }

    activityList() {
        if (this.state.isActivityListShown) {
            return (
                <ActivityList items={this.props.event.activityList} />
            );
        }
    }

    removeImage(fileId) {
        if (this.isEditable()) {
            Meteor.call('eventRemoveImage', fileId, this.props.event._id);
        }
    }

    images() {
        if (this.props.event.images && this.props.event.images.length) {
            return (
                <ImageList
                    imageIds={this.props.event.images}
                    isEditable={this.isEditable()}
                    removeImage={this.removeImage} />
            );
        }
    }

    imageUploader() {
        if (this.isEditable()) {
            return (
                <ImageUploader
                    successCallback={this.imageUploadSuccess} />
            );
        }
    }

    imageUploadSuccess(fileId) {
        Meteor.call('eventImageUpload', fileId, this.props.event._id);
    }

    description() {
        if (this.props.event.description) {
            return (
                <div className='description'>{this.props.event.description}</div>
            );
        }
    }

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
                    guests={this.props.event.guests || []}
                    attendMethod={this.attend.bind(this)}
                    unattendMethod={this.unattend.bind(this)} />
                {this.activityList()}
                {this.commentsList()}
                {this.googleMap()}
                <EventFooter
                    guests={this.props.event.guests || []}
                    maxAttendance={this.props.event.maxAttendance}
                    minAttendance={this.props.event.minAttendance}
                    activityList={this.props.event.activityList}
                    isActivityListShown={this.state.isActivityListShown}
                    toggleActivityList={StateToggler.bind(this, 'isActivityListShown')}
                    isMapShown={this.state.isMapShown}
                    toggleMap={StateToggler.bind(this, 'isMapShown')}
                    isCommentsShown={this.state.isCommentsShown}
                    toggleComments={StateToggler.bind(this, 'isCommentsShown')}
                    isOwnEvent={this.isOwnEvent()}
                    isAdminMode={this.state.isAdminMode}
                    toggleAdminMode={StateToggler.bind(this, 'isAdminMode')}
                    hasMap={Boolean(this.props.event.geocode)} />
            </div>
        );
    }
};

Event.propTypes = {
    event: React.PropTypes.object.isRequired
};
