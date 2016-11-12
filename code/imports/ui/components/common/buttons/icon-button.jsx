import React    from 'react';

import Icon     from '../icon.jsx';

const renderText = (text) => {
    if (text) {
        return (
            <span className='text'>{text}</span>
        );
    }
};

export default IconButton = ({ additionalClasses, isUnstyled, action, type, text }) => {
    let classNames = 'button';

    if (additionalClasses) {
        classNames += ' ' + additionalClasses;
    }

    if (isUnstyled) {
        classNames += ' unstyled';
    }

    return (
        <button
            className={classNames}
            onClick={action} >
            <Icon type={type} />
            {renderText(text)}
        </button>
    );
};

IconButton.propTypes = {
    action: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired,
    text: React.PropTypes.string,
    isUnstyled: React.PropTypes.bool,
    additionalClasses: React.PropTypes.string
};
