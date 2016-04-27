import React, { Component } from 'react';

export default class Bubble extends Component {
    render() {
        let containerClasses = 'bubble ' + this.props.position;

        if (!this.props.isShown) {
            containerClasses += ' hidden';
        }

        return (
            <div className={containerClasses}>
                {this.props.content}
            </div>
        );
    }
};

Bubble.propTypes = {
    position: React.PropTypes.string.isRequired,
    isShown: React.PropTypes.bool.isRequired
};
