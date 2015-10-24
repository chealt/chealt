Login = React.createClass({
    login() {
        Meteor.loginWithGoogle({
            requestPermissions: ['email', 'profile', 'https://www.googleapis.com/auth/fitness.activity.read']
        });
    },
    render() {
        return (
            <button
                className='google-login button-main upper'
                onClick={this.login} >
                google
            </button>
        );
    }
});