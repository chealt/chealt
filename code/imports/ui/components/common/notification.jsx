import React        from 'react';
import { connect }  from 'react-redux';

const renderUndoButton = (undoMethod) => {
    if (undoMethod) {
        return (
            <button
                className='undo button neutral upper underlined'
                onClick={undoMethod}>undo</button>
        );
    }
};

const Notification = ({ text, shown, undoMethod }) => {
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

const mapState = ({ notification }) => {
    return {
        text: notification.text,
        undoMethod: notification.undoMethod,
        shown: notification.shown
    };
};

export default connect(mapState)(Notification);

Notification.propTypes = {
    text: React.PropTypes.string.isRequired,
    shown: React.PropTypes.bool.isRequired,
    undoMethod: React.PropTypes.func
};
