import React, { Component } from 'react';

export default class MainButton extends Component {
    render() {
        let classNames = 'button main';

        if (this.props.additionalClasses) {
            classNames += ' ' + this.props.additionalClasses;
        }

        return (
            <button
                className={classNames}
                onClick={this.props.action} >
                {this.props.text}
            </button>
        );
    }
};

MainButton.propTypes = {
    action: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired
};
