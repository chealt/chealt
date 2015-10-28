ProfileInfo = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    weight() {
        if (this.props.user.profile.weight) {
            return (
                <div className='weight'>
                    Weight: {this.props.user.profile.weight}
                </div>
            );
        }
    },
    render() {
        return (
            <div className='profile-info'>
                <div className='name'>{this.props.user.profile.name}</div>
                <div className='email'>{this.props.user.profile.email}</div>
                {this.weight()}
            </div>
        );
    }
});
