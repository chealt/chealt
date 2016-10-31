import React    from 'react';
import Event    from './events/event.jsx';

const renderEvents = (events, canComment, showNotification) => {
    return events.map((event) => {
        return (
            <Event
                key={event._id}
                event={event}
                canComment={canComment}
                showNotification={showNotification} />
        );
    });
};

export default HomePage = ({ events, canComment, showNotification }) => (
    <div className='cards-container padded'>
        {renderEvents(events, canComment, showNotification)}
    </div>
);

HomePage.propTypes = {
    events: React.PropTypes.array
};
