const { Dialog, FlatButton } = MUI;

ConfirmDialog = React.createClass({
    propTypes: {
        open: React.PropTypes.bool.isRequired,
        closeDialog: React.PropTypes.func.isRequired,
        confirmAction: React.PropTypes.func.isRequired,
        message: React.PropTypes.string.isRequired
    },
    confirmAction() {
        this.props.confirmAction();
        this.props.closeDialog();
    },
    actions() {
        return [
            <FlatButton
                label='Cancel'
                secondary={true}
                onTouchTap={this.props.closeDialog} />,
            <FlatButton
                label='Ok'
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.confirmAction} />
        ];
    },
    render() {
        return (
            <Dialog
                title='Are you sure?'
                actions={this.actions()}
                open={this.props.open}
                onRequestClose={this.props.closeDialog}>
                {this.props.message}
            </Dialog>
        );
    }
});