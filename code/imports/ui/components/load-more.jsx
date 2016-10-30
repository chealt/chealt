import React, { Component } from 'react';

export default class LoadMore extends Component {
    render() {
        let triggerClassName = 'load-more-trigger'

        if (this.props.position) {
            triggerClassName += ' ' + this.props.position;
        }

        return (
            <div className={triggerClassName}>
                <span className='load-more' onClick={this.props.onClick}>...</span>
            </div>
        );
    }
};

LoadMore.propTypes = {
    onClick: React.PropTypes.func.isRequired
}