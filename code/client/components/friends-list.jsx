const { List, ListItem, Avatar, MenuItem } = MUI;

FriendsList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    getInitialState() {
        return {
            isOpenConfirmDialog: false,
            friendEmailForDeletion: null
        };
    },
    removeFriend(email) {
        Meteor.call('users.removeFriend', email);
    },
    confirmDeletion(email) {
        this.setState({
            isOpenConfirmDialog: true,
            friendEmailForDeletion: email
        });
    },
    closeDialog() {
        this.setState({
            isOpenConfirmDialog: false,
            friendEmailForDeletion: null
        });
    },
    menuItems(email) {
        return (
            <RightIconMenu>
                <MenuItem onClick={this.confirmDeletion.bind(this, email)}>Delete</MenuItem>
            </RightIconMenu>
        );
    },
    friendsList() {
        const currentUser = this.data.currentUser;

        if (currentUser && currentUser.friends) {
            return currentUser.friends.map((friend, index) => {
                return (
                    <ListItem
                        key={index}
                        primaryText={friend.email}
                        rightIconButton={this.menuItems(friend.email)} />
                );
            });
        }
    },
    render() {
        return (
            <List className='friends-list'>
                {this.friendsList()}
                <ConfirmDialog
                    open={this.state.isOpenConfirmDialog}
                    confirmAction={this.removeFriend.bind(this, this.state.friendEmailForDeletion)}
                    closeDialog={this.closeDialog}
                    message='This will remove your friend from the list!' />
            </List>
        );
    }
});