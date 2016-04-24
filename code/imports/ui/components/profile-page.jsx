injectTapEventPlugin();

const { Tabs, Tab, Styles } = MUI;
const { Colors, ThemeManager } = Styles;

ProfilePage = React.createClass({
    childContextTypes : {
        muiTheme: React.PropTypes.object,
    },
    componentWillMount() {
        let newMuiTheme = ThemeManager.getMuiTheme(ChealtRawTheme);
        
        newMuiTheme.tabs.textColor = Colors.grey500;
        newMuiTheme.tabs.backgroundColor = Colors.fullWhite;
        newMuiTheme.tabs.selectedTextColor = Colors.fullBlack;
        newMuiTheme.textField.hintColor = Colors.grey400;

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
                <div className='card'>
                    <Tabs>
                        <Tab label='Friends'>
                            <div className='padded'>
                                <InviteFriend />
                                <FriendsList />
                            </div>
                        </Tab>
                        <Tab label='Settings'>
                            <h2>Settings</h2>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
});