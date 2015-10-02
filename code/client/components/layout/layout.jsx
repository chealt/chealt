Layout = React.createClass({
    render() {
        return (
            <div id="wrapper">
                {this.props.header}
                {this.props.content}
                {this.props.footer}
            </div>
        );
    }
});