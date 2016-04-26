import React from 'react';

export default FormatTime = ({ date }) => {
    const paddedHours = '0' + date.getHours();
    const paddedMinutes = '0' + date.getMinutes();
    const formattedTime = paddedHours.substr(-2) + ':' + paddedMinutes.substr(-2);

    return (
        <span className='time formatted'>{formattedTime}</span>
    );
};