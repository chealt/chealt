import React from 'react';

export default Attendance = ({ guests, minAttendance, maxAttendance }) => {
    let attendanceClass = 'attendance';
    let attendance = String(guests.length);

    if (maxAttendance) {
        attendance += '/' + maxAttendance;

        if (guests.length > maxAttendance) {
            attendanceClass += ' above';
        }
    }

    if (minAttendance) {
        if (guests.length < minAttendance) {
            attendanceClass += ' below';
        }
    }

    return (
        <span className={attendanceClass}>{attendance}</span>
    );
};

Attendance.propTypes = {
    guests: React.PropTypes.array.isRequired,
    minAttendance: React.PropTypes.number,
    maxAttendance: React.PropTypes.number
};