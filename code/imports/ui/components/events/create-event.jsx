import React                    from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

import FullPageModal            from '../common/full-page-modal';
import CreateEventFormContainer from '../../containers/create-event-form';
import {
    closeEventCreator
} from '../../actions/create-event';

const renderCreateEvent = (createEvent, closeMethod) => {
    if (createEvent) {
        return (
            <FullPageModal
                closeMethod={closeMethod}
                title='Create Event'>
                <CreateEventFormContainer />
            </FullPageModal>
        );
    }
};

const EventCreator = ({ createEvent, closeMethod }) => (
    <ReactCSSTransitionGroup
        transitionName='fader'
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}>
        {renderCreateEvent(createEvent, closeMethod)}
    </ReactCSSTransitionGroup>
);

const mapState = ({ createEvent }) => {
    return {
        createEvent
    };
};

const mapDispatch = (dispatch) => {
    return {
        closeMethod: () => {
            dispatch(closeEventCreator());
        }
    };
};

export default connect(mapState, mapDispatch)(EventCreator);
