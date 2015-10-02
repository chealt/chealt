const ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();

const { Card, CardHeader, CardText, Avatar } = mui;

Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.event.name}
                    subtitle={this.props.event.host}
                    avatar={<Avatar>B</Avatar>} />
                <CardText>
                    <div className="start">{this.props.event.start.toTimeString()}</div>
                    <ActionAlarm />
                    <div className="end">{this.props.event.end.toTimeString()}</div>
                </CardText>
            </Card>
        );
    }
});