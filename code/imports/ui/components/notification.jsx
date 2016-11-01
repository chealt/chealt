import React from 'react';

const renderUndoButton = (undoMethod) => {
    if (undoMethod) {
        return (
            <button
                className='undo button neutral upper underlined'
                onClick={undoMethod}>undo</button>
        );
    }
};

export default Notification = ({ text, shown, undoMethod }) => {
    let notificationClass = 'notification-container shadow';

    if (shown) {
        notificationClass += ' shown';
    }

    return (
        <div className={notificationClass}>
            <span className="text">{text}</span>
            {renderUndoButton(undoMethod)}
        </div>
    );
};

Notification.propTypes = {
    text: React.PropTypes.string.isRequired,
    shown: React.PropTypes.bool.isRequired,
    undoMethod: React.PropTypes.func
};
