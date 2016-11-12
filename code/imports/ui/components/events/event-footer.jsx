import React                from 'react';
import { connect }          from 'react-redux';

import Attendance           from './attendance.jsx';
import TogglerButton        from '../common/buttons/toggler-button.jsx';
import {
    toggleEventMap,
    toggleEventComments
} from '../../actions/events';

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

const mapToggler = (hasMap, toggleEventMap, isMapShown) => {
    if (hasMap) {
        return (
            <TogglerButton
                type='map'
                toggleFunction={toggleEventMap}
                active={isMapShown} />
        );
    }
};

const commentToggler = (canComment, toggleEventComments, isCommentsShown) => {
    if (canComment) {
        return (
            <TogglerButton
                type='bubbles4'
                toggleFunction={toggleEventComments}
                active={isCommentsShown} />
        );
    }
};

const EventFooter = ({ guests, minAttendance, maxAttendance, hasMap, toggleEventMap, isMapShown, canComment, toggleEventComments, isCommentsShown }) => (
    <div className='footer row equal separated top'>
        <div className='figures-container'>
            {attendance(guests, minAttendance, maxAttendance)}
        </div>
        <div className='controls-container'>
            {mapToggler(hasMap, toggleEventMap, isMapShown)}
            {commentToggler(canComment, toggleEventComments, isCommentsShown)}
        </div>
    </div>
);

const mapDispatch = (dispatch, ownProps) => {
    return {
        toggleEventMap: () => {
            dispatch(toggleEventMap(ownProps.eventId));
        },
        toggleEventComments: () => {
            dispatch(toggleEventComments(ownProps.eventId));
        }
    };
};

export default connect(null, mapDispatch)(EventFooter);

EventFooter.propTypes = {
    eventId: React.PropTypes.object.isRequired
};