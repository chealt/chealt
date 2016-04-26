import React        from 'react';
import IconButton   from './icon-button.jsx';

export default TogglerButton = ({ type, toggleFunction, active }) => (
    <IconButton
        type={type}
        action={toggleFunction}
        additionalClasses={active ? 'active' : ''} />
);

TogglerButton.propTypes = {
    type: React.PropTypes.string.isRequired,
    toggleFunction: React.PropTypes.func.isRequired
};
