import React from 'react';

export default BubbleArrow = ({ position, isShown }) => {
    let containerClasses = 'bubble-arrow-container ' + position;

    if (!isShown) {
        containerClasses += ' hidden';
    }

    return (
        <div className={containerClasses}>
            <div className='bubble-arrow background'></div>
            <div className='bubble-arrow foreground'></div>
        </div>
    );
};

BubbleArrow.propTypes = {
    position: React.PropTypes.string.isRequired,
    isShown: React.PropTypes.bool.isRequired
};
