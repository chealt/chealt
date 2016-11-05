import React        from 'react';
import { connect }  from 'react-redux';

import Event        from './events/event.jsx';

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

const HomePage = ({ events, canComment }) => (
    <div className='cards-container padded'>
        {renderEvents(events, canComment)}
    </div>
);

const mapState = ({ events }, ownProps) => {
    const statefullEvents = ownProps.events.map((propEvent) => {
        const eventState = events.find(event => event.id === propEvent._id);
        
        return Object.assign({}, propEvent, eventState);
    });

    return {
        events: statefullEvents
    };
};

export default connect(mapState)(HomePage);

HomePage.propTypes = {
    events: React.PropTypes.array
};
