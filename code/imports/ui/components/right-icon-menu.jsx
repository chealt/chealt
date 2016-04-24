const { Styles, IconButton, Libs, IconMenu } = MUI;
const { Colors } = Styles;
const { NavigationMoreVert } = Libs.SvgIcons;

RightIconMenu = React.createClass({
    iconButton() {
        return (
            <IconButton
                touch={true}
                tooltip='more'
                tooltipPosition='bottom-left'>
                <NavigationMoreVert color={Colors.grey400} />
            </IconButton>
        );
    },
    render() {
        return (
            <IconMenu
                iconButtonElement={this.iconButton()}
                style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: '4px'
                }}>
                {this.props.children}
            </IconMenu>
        );
    }
})