import React, { Component } from 'react';
import Attendance           from './attendance.jsx';
import TogglerButton        from '../toggler-button.jsx';

export default class EventFooter extends Component {
    attendance() {
        if (this.props.guests) {
            return (
                <Attendance
                    guests={this.props.guests}
                    minAttendance={this.props.minAttendance}
                    maxAttendance={this.props.maxAttendance} />
            );
        }
    }

    mapToggler() {
        if (this.props.hasMap) {
            return (
                <TogglerButton
                    type='map'
                    toggleFunction={this.props.toggleMap}
                    active={this.props.isMapShown} />
            );
        }
    }

    render() {
        return (
            <div className='footer row equal separated top'>
                <div className='figures-container'>
                    {this.attendance()}
                </div>
                <div className='controls-container'>
                    {this.mapToggler()}
                    <TogglerButton
                        type='bubbles4'
                        toggleFunction={this.props.toggleComments}
                        active={this.props.isCommentsShown} />
                </div>
            </div>
        );
    }
};
