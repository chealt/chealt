import React    from 'react';
import Event    from './events/event.jsx';

const renderEvents = (events) => {
    return events.map((event) => {
        return (
            <Event
                key={event._id}
                event={event} />
        );
    });
};

export default HomePage = ({ events }) => (
    <div className='cards-container padded'>
        {renderEvents(events)}
    </div>
);

HomePage.propTypes = {
    events: React.PropTypes.array
};
