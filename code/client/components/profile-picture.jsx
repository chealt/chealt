ProfilePicture = React.createClass({
    propTypes: {
        imagePath: React.PropTypes.string.isRequired
    },
    render() {
        const style = {
            backgroundImage: 'url(' + this.props.imagePath + ')'
        };

        return (
            <span
                className='profile-picture'
                style={style}></span>
        );
    }
});