Wrapper = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    render() {
        <html>
            <head>
                <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='theme-color' content='#337ab7' />
                <title>{this.props.title}</title>
            </head>
            <body>{this.props.body}</body>
        </html>
    }
});