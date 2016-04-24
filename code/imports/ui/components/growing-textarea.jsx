GrowingTextarea = React.createClass({
    getInitialState() {
        return {
            height: 42
        };
    },
    calculateHeight(event) {
        this.setState({
            height: event.target.scrollHeight
        });
    },
    style() {
        return {
            height: this.state.height
        };
    },
    onChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    },
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
                    onKeyUp={this.calculateHeight}
                    onChange={this.onChange}
                    value={this.props.value}></textarea>
            </div>
        );
    }
});
