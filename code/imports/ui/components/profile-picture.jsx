ProfilePicture = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    profilePicture() {
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
    },
    element() {
        if (this.props.isTooltiped) {
            return (
                <Tooltip
                    content={this.profilePicture()}
                    tooltipContent={this.props.user.name} />
            );
        } else {
            return this.profilePicture();
        }
    },
    render() {
        return (this.element());
    }
});