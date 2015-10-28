ProfilePicture = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    render() {
        if (this.props.user.picture) {
            style = { backgroundImage: 'url(' + this.props.user.picture + ')' };
        } else {
            style = { display: 'none' }
        }

        const initial = this.props.user.name.substring(0, 1);

        return (
            <span
                className='profile-picture'
                onClick={this.props.onClick}>
                <span className='initial'>{initial}</span>
                <span className='picture' style={style}></span>
            </span>
        );
    }
});