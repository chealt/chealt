import React            from 'react';
import Attendance       from './attendance.jsx';
import TogglerButton    from '../toggler-button.jsx';

const attendance = (guests, minAttendance, maxAttendance) => {
    if (guests) {
        return (
            <Attendance
                guests={guests}
                minAttendance={minAttendance}
                maxAttendance={maxAttendance} />
        );
    }
};

const mapToggler = (hasMap, toggleMap, isMapShown) => {
    if (hasMap) {
        return (
            <TogglerButton
                type='map'
                toggleFunction={toggleMap}
                active={isMapShown} />
        );
    }
};

export default EventFooter = ({ guests, minAttendance, maxAttendance, hasMap, toggleMap, isMapShown, toggleComments, isCommentsShown }) => (
    <div className='footer row equal separated top'>
        <div className='figures-container'>
            {attendance(guests, minAttendance, maxAttendance)}
        </div>
        <div className='controls-container'>
            {mapToggler(hasMap, toggleMap, isMapShown)}
            <TogglerButton
                type='bubbles4'
                toggleFunction={toggleComments}
                active={isCommentsShown} />
        </div>
    </div>
);
