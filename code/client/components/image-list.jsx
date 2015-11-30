ImageList = React.createClass({
    propTypes: {
        imageIds: React.PropTypes.array.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            images: Images.find({
                _id: { $in: this.props.imageIds }
            }).fetch()
        };
    },
    render() {
        return (
            <ul className='image-list'>
                {this.data.images.map((image) => {
                    return (
                        <li><img key={image._id} src={image.url} alt={image.alt} /></li>
                    );
                })}
            </ul>
        );
    }
});