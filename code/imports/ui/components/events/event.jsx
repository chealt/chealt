import React, { Component } from 'react';
import { connect }          from 'react-redux';

import EventTitle           from './event-title';
import EventHeader          from './event-header';
import EventFooter          from './event-footer';
import StateToggler         from '../mixins/state-toggler';
import GoogleMap            from '../google-map';
import Guests               from '../../containers/guests';
import Comments             from '../../containers/comments';
import { showMoreComments } from '../../actions/events';
import {
    attendEvent,
    unattendEvent,
    updateGeoCode
} from '../../../api/events/methods';

class Event extends Component {
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

    commentsList() {
        if (this.props.event.isCommentsShown) {
            return (
                <Comments
                    itemType='event'
                    itemId={this.props.event._id}
                    commentLimit={this.props.event.commentLimit}
                    loadMore={this.props.showMoreComments} />
            );
        }
    }

    googleMap() {
        if (this.props.event.geocode) {
            return (
                <GoogleMap
                    geocode={this.props.event.geocode}
                    isMapShown={this.props.event.isMapShown}
                    mapId={this.props.event._id.valueOf()} />
            );
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
                {this.description()}
                <Guests 
                    guests={this.props.event.guests || []}
                    attendMethod={this.attend.bind(this)}
                    unattendMethod={this.unattend.bind(this)} />
                {this.commentsList()}
                {this.googleMap()}
                <EventFooter
                    eventId={this.props.event._id}
                    guests={this.props.event.guests || []}
                    maxAttendance={this.props.event.maxAttendance}
                    minAttendance={this.props.event.minAttendance}
                    isMapShown={this.props.event.isMapShown}
                    isCommentsShown={this.props.event.isCommentsShown}
                    canComment={this.props.canComment}
                    hasMap={Boolean(this.props.event.geocode)} />
            </div>
        );
    }
};

const mapDispatch = (dispatch, ownProps) => {
    return {
        showMoreComments: () => {
            dispatch(showMoreComments(ownProps.event._id));
        }
    };
};

export default connect(null, mapDispatch)(Event);

Event.propTypes = {
    event: React.PropTypes.object.isRequired
};
