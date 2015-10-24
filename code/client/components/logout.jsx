Logout = React.createClass({
    logout() {
        Meteor.logout();
    },
    render() {
        return (
            <button
                className='logout button-main upper'
                onClick={this.logout} >
                logout
            </button>
        );
    }
});