import React, { Component } from 'react';

import EventTitle           from './event-title.jsx';
import EventHeader          from './event-header.jsx';
import EventFooter          from './event-footer.jsx';
import StateToggler         from '../mixins/state-toggler.jsx';
import GoogleMap            from '../google-map.jsx';
import Guests               from '../../containers/Guests.jsx';
import Comments             from '../../containers/Comments.jsx';

import {
    attendEvent,
    unattendEvent,
    updateGeoCode
} from '../../../api/events/methods.js';

export default class Event extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isCommentsShown: false,
            isMapShown: false,
            commentLimit: 2
        };
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
                    guests={this.props.event.guests || []}
                    maxAttendance={this.props.event.maxAttendance}
                    minAttendance={this.props.event.minAttendance}
                    isMapShown={this.state.isMapShown}
                    toggleMap={StateToggler.bind(this, 'isMapShown')}
                    isCommentsShown={this.state.isCommentsShown}
                    toggleComments={StateToggler.bind(this, 'isCommentsShown')}
                    hasMap={Boolean(this.props.event.geocode)} />
            </div>
        );
    }
};

Event.propTypes = {
    event: React.PropTypes.object.isRequired
};
