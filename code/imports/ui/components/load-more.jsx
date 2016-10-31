import React from 'react';

export default LoadMore = ({ position, onClick }) => {
    let triggerClassName = 'load-more-trigger'

    if (position) {
        triggerClassName += ' ' + position;
    }

    return (
        <div className={triggerClassName}>
            <button className='load-more' onClick={onClick}>...</button>
        </div>
    );
};

LoadMore.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    position: React.PropTypes.string
}