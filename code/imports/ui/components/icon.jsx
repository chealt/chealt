import React from 'react';

export default Icon = ({ type, position, additionalClasses }) => {
    let iconClass = 'icon icon-' + type;

    if (additionalClasses) {
        iconClass += ' ' + additionalClasses;
    }

    if (position) {
        iconClass += ' ' + position;
    }

    return (
        <span className={iconClass}></span>
    );
};

Icon.propTypes = {
    type: React.PropTypes.string.isRequired
};
