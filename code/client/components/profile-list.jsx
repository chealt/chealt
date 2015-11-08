ProfileList = React.createClass({
    propTypes: {
        profileList: React.PropTypes.array.isRequired,
        containerClass: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <ul className={this.props.containerClass}>
                {this.props.profileList.map((profile) => {
                    return (
                        <li className='item' key={profile._id}>
                            <ProfilePicture
                                user={profile}
                                isTooltiped={true} />
                        </li>
                    );
                })}
            </ul>
        );
    }
})