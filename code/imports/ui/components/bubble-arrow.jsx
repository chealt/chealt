import React, { Component } from 'react';

export default class BubbleArrow extends Component {
    render() {
        let containerClasses = 'bubble-arrow-container ' + this.props.position;

        if (!this.props.isShown) {
            containerClasses += ' hidden';
        }

        return (
            <div className={containerClasses}>
                <div className='bubble-arrow background'></div>
                <div className='bubble-arrow foreground'></div>
            </div>
        );
    }
};

BubbleArrow.propTypes = {
    position: React.PropTypes.string.isRequired,
    isShown: React.PropTypes.bool.isRequired
};
