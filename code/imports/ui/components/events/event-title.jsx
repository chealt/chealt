import React        from 'react';
import FormatDate   from '../helpers/format-date.jsx';

const sportsIcon = (activity) => {
    if (activity) {
        return <SportsIcon activity={activity} />
    }
};

const eventDate = (start, end) => {
    const startDate = start.toISOString().substring(0, 10);
    const endDate = end.toISOString().substring(0, 10);

    if (startDate == endDate) {
        return (
            <FormatDate date={startDate} />
        );
    } else {
        return (
            <span className='date'>
                <FormatDate date={startDate} />
                <span className='divider'> - </span>
                <FormatDate date={endDate} />
            </span>
        );
    }
};

export default Event = ({ activity, start, end, name }) => (
    <h2 className='title'>
        {sportsIcon(activity)}
        <span className='name'>{name}</span>
        {eventDate(start, end)}
    </h2>
);

Event.propTypes = {
    name: React.PropTypes.string.isRequired,
    start: React.PropTypes.object.isRequired,
    end: React.PropTypes.object.isRequired,
    activity: React.PropTypes.string
};