import React                    from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

const renderUndoButton = (undoMethod) => {
    if (undoMethod) {
        return (
            <button
                className='undo button neutral upper underlined'
                onClick={undoMethod}>undo</button>
        );
    }
};

const renderNotification = (shown, text, undoMethod) => {
    if (shown) {
        return (
            <div className='notification-container shadow'>
                <span className="text">{text}</span>
                {renderUndoButton(undoMethod)}
            </div>
        );
    }
}

const Notification = ({ shown, text, undoMethod }) => (
    <ReactCSSTransitionGroup
        transitionName='fader'
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}>
        {renderNotification(shown, text, undoMethod)}
    </ReactCSSTransitionGroup>
);

const mapState = ({ notification }) => {
    return {
        text: notification.text,
        undoMethod: notification.undoMethod,
        shown: notification.shown
    };
};

export default connect(mapState)(Notification);

Notification.propTypes = {
    shown: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
    undoMethod: React.PropTypes.func
};
