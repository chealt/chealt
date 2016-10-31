import React        from 'react';
import Icon         from '../icon.jsx';
import FormatTime   from '../helpers/format-time.jsx';

const getTime = (start, end) => {
    if (start.getTime() !== end.getTime()) {
        return (
            <div className='time-container row--m equal'>
                <div className='start'>
                    <FormatTime date={start} />
                </div>
                <Icon type='clock3' additionalClasses='clock' />
                <div className='end'>
                    <FormatTime date={end} />
                </div>
            </div>
        );
    }
};

export default EventHeader = ({ start, end, hostName, location }) => (
    <div className='content-header row--m equal separated vertical'>
        <div className='host'>
            <Icon type='user' position='before' />
            <span className='text'>host: {hostName}</span>
        </div>
        {getTime(start, end)}
        <div className='location'>
            <Icon type='earth2' position='before' />
            {location}
        </div>
    </div>
);

EventHeader.propTypes = {
    hostName: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    start: React.PropTypes.object.isRequired,
    end: React.PropTypes.object.isRequired
};
