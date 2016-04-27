import React from 'react';

export default SportsIcon = ({ activity }) => (
    <span className={`sports-icon ${activity}`}></span>
);

SportsIcon.propTypes = {
    activity: React.PropTypes.string.isRequired
};
