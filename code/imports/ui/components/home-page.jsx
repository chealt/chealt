import React    from 'react';
import Event    from './events/event.jsx';

const renderEvents = (events, canComment) => {
    return events.map((event) => {
        return (
            <Event
                key={event._id}
                event={event}
                canComment={canComment} />
        );
    });
};

export default HomePage = ({ events, canComment }) => (
    <div className='cards-container padded'>
        {renderEvents(events, canComment)}
    </div>
);

HomePage.propTypes = {
    events: React.PropTypes.array
};
