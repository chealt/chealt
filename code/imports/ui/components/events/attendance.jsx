import React, { Component } from 'react';

export default class Attendance extends Component {
    render() {
        let attendanceClass = 'attendance';
        let attendance = String(this.props.guests.length);

        if (this.props.maxAttendance) {
            attendance += '/' + this.props.maxAttendance;

            if (this.props.guests.length > this.props.maxAttendance) {
                attendanceClass += ' above';
            }
        }

        if (this.props.minAttendance) {
            if (this.props.guests.length < this.props.minAttendance) {
                attendanceClass += ' below';
            }
        }

        return (
            <span className={attendanceClass}>{attendance}</span>
        );
    }
};

Attendance.propTypes = {
    guests: React.PropTypes.array.isRequired,
    minAttendance: React.PropTypes.number,
    maxAttendance: React.PropTypes.number
};