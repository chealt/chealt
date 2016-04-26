import React from 'react';

export default Tooltip = ({ side = 'right', content, tooltipContent }) => {
    const tooltipClass = `tooltip ${side}`;

    return (
        <div className='tooltiped'>
            {content}
            <span className={tooltipClass}>{tooltipContent}</span>
        </div>
    );
};

Tooltip.propTypes = {
    content: React.PropTypes.node.isRequired,
    tooltipContent: React.PropTypes.node.isRequired
};
