import React            from 'react';
import { connect }      from 'react-redux';

import Attendance       from './attendance.jsx';
import TogglerButton    from '../toggler-button.jsx';
import { toggleMap }    from '../../actions/map';

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

const commentToggler = (canComment, toggleComments, isCommentsShown) => {
    if (canComment) {
        return (
            <TogglerButton
                type='bubbles4'
                toggleFunction={toggleComments}
                active={isCommentsShown} />
        );
    }
};

const EventFooter = ({ guests, minAttendance, maxAttendance, hasMap, toggleMap, isMapShown, canComment, toggleComments, isCommentsShown }) => (
    <div className='footer row equal separated top'>
        <div className='figures-container'>
            {attendance(guests, minAttendance, maxAttendance)}
        </div>
        <div className='controls-container'>
            {mapToggler(hasMap, toggleMap, isMapShown)}
            {commentToggler(canComment, toggleComments, isCommentsShown)}
        </div>
    </div>
);

const mapDispatch = (dispatch) => {
    return {
        toggleMap: () => {
            dispatch(toggleMap());
        }
    };
};

export default connect(null, mapDispatch)(EventFooter);
