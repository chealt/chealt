import React, { Component } from 'react';

export default class GrowingTextarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 42
        };
    }

    calculateHeight(event) {
        this.setState({
            height: event.target.scrollHeight
        });
    }

    style() {
        return {
            height: this.state.height
        };
    }

    onChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    render() {
        let classes = 'growing-textarea';
        let containerClasses = 'textarea-container';

        if (this.props.additionalClasses) {
            classes += ' ' + this.props.additionalClasses;
        }

        if (this.props.containerClasses) {
            containerClasses += ' ' + this.props.containerClasses;
        }

        return (
            <div
                className={containerClasses}
                style={this.style()}>
                <textarea
                    className={classes}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onKeyUp={this.calculateHeight.bind(this)}
                    onChange={this.onChange.bind(this)}
                    value={this.props.value}></textarea>
            </div>
        );
    }
};
