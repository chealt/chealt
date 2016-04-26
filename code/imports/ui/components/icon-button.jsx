import React, { Component } from 'react';
import Icon                 from './icon.jsx';

export default class IconButton extends Component {
    text() {
        if (this.props.text) {
            return (
                <span className='text'>{this.props.text}</span>
            );
        }
    }

    render() {
        let classNames = 'button';

        if (this.props.additionalClasses) {
            classNames += ' ' + this.props.additionalClasses;
        }

        if (this.props.isUnstyled) {
            classNames += ' unstyled';
        }

        return (
            <button
                className={classNames}
                onClick={this.props.action} >
                <Icon type={this.props.type} />
                {this.text()}
            </button>
        );
    }
};

IconButton.propTypes = {
    action: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired
};
