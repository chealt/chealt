import React from 'react';

export default MainButton = ({ additionalClasses, action, text }) => {
    let classNames = 'button main';

    if (additionalClasses) {
        classNames += ' ' + additionalClasses;
    }

    return (
        <button
            className={classNames}
            onClick={action} >
            {text}
        </button>
    );
};

MainButton.propTypes = {
    action: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    additionalClasses: React.PropTypes.string
};
