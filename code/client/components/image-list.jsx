ImageList = React.createClass({
    propTypes: {
        imageIds: React.PropTypes.array.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            images: Images.find({
                    _id: { $in: this.props.imageIds }
                }, { limit: 3 }).fetch(),
            imageCount: Images.find({
                    _id: { $in: this.props.imageIds }
                }).count()
        };
    },
    render() {
        return (
            <ul className='image-list'>
                {this.data.images.map((image) => {
                    return (
                        <li className='item' key={image._id} style={{ backgroundImage: 'url("' + image.url() + '")' }}></li>
                    );
                })}
            </ul>
        );
    }
});