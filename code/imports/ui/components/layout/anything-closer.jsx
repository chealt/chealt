import React from 'react';

export default AnythingCloser = ({ onClick }) => (
    <div className='anything-closer' onClick={onClick}></div>
);

AnythingCloser.propTypes = {
    onClick: React.PropTypes.func.isRequired
};
