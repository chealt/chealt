import React from 'react';

export default Bubble = ({ position, isShown, content }) => {
    let containerClasses = 'bubble ' + position;

    if (!isShown) {
        containerClasses += ' hidden';
    }

    return (
        <div className={containerClasses}>
            {content}
        </div>
    );
};

Bubble.propTypes = {
    position: React.PropTypes.string.isRequired,
    isShown: React.PropTypes.bool.isRequired,
    content: React.PropTypes.element.isRequired
};
