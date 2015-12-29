const { TextField } = MUI;

InviteFriend = React.createClass({
    getInitialState() {
        return {
            errorText: '',
            emailValue: ''
        };
    },
    invite(event) {
        event.preventDefault();

        const component = this;
        const email = component.state.emailValue;

        Meteor.call('users.inviteFriend', email, function (error, result) {
            if (error) {
                let errorText;

                switch (error.error) {
                    case 'already-friend':
                        errorText = 'Already a friend!';

                        break;
                    default:
                        errorText = 'You entered an invalid email address!';
                        
                        break;
                }
                
                component.setState({
                    errorText: errorText
                });
            } else {
                component.setState({
                    emailValue: '',
                    errorText: ''
                });
            }
        });
    },
    changeEmailValue(event) {
        this.setState({
            emailValue: event.target.value
        });
    },
    render() {
        return (
            <div className='invite-friend-container'>
                <form onSubmit={this.invite}>
                    <TextField
                        floatingLabelText='Invite a friend'
                        hintText='email'
                        errorText={this.state.errorText}
                        value={this.state.emailValue}
                        onChange={this.changeEmailValue} />
                    <button
                        className='invite button neutral upper'
                        onClick={this.invite}>invite</button>
                </form>
            </div>
        );
    }
});