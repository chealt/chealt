injectTapEventPlugin();

const { Tabs, Tab, Styles } = MUI;
const { Colors, ThemeManager } = Styles;

ProfilePage = React.createClass({
    childContextTypes : {
        muiTheme: React.PropTypes.object,
    },
    componentWillMount() {
        let newMuiTheme = ThemeManager.getMuiTheme(ChealtRawTheme);
        
        newMuiTheme.tabs.textColor = Colors.darkBlack;
        newMuiTheme.tabs.backgroundColor = Colors.fullWhite;
        newMuiTheme.tabs.selectedTextColor = Colors.fullBlack;

        this.setState({
            muiTheme: newMuiTheme
        });
    },
    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },
    render() {
        return (
            <div className='padded'>
                <Tabs>
                    <Tab label='Friends'>
                        <h2>Friends</h2>
                    </Tab>
                    <Tab label='Settings'>
                        <h2>Settings</h2>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});