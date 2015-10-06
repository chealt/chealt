Drawer = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired
    },
    render() {
        return (
            <div id={this.props.id}>
                <ul>
                    {this.props.items.map(function (item) {
                        return <li key={item.key}>{item.name}</li>;
                    })}
                </ul>
            </div>
        );
    }
});