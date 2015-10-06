Layout = React.createClass({
    render() {
        var drawerItems = [
                {
                    key: 0,
                    name: 'asd'
                }
            ];

        return (
            <div id="wrapper">
                <Drawer id="app-side-drawer" items={drawerItems} />
                {this.props.header}
                {this.props.content}
                {this.props.footer}
            </div>
        );
    }
});