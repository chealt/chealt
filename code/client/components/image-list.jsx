ImageList = React.createClass({
    propTypes: {
        imageIds: React.PropTypes.array.isRequired
    },
    getInitialState() {
        return {
            limit: 3
        };
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            images: Images.find({
                    _id: { $in: this.props.imageIds }
                }, { limit: this.state.limit }).fetch(),
            imageCount: Images.find({
                    _id: { $in: this.props.imageIds }
                }).count()
        };
    },
    loadMore() {
        this.setState({
            limit: this.state.limit + 3
        });
    },
    loadMoreRender() {
        if (this.data.imageCount > this.state.limit) {
            return (<LoadMore onClick={this.loadMore} position='bottom' />);
        }
    },
    removeIcon(imageId) {
        if (this.props.isAdmin) {
            return (
                <IconButton
                    type='cross'
                    action={this.props.removeImage.bind(null, imageId)}
                    additionalClasses='remove background small' />
            );
        }
    },
    render() {
        return (
            <div className='load-more-container'>
                {this.loadMoreRender()}
                <ul className='image-list'>
                    {this.data.images.map((image) => {
                        const style = {
                            backgroundImage: 'url("' + image.url() + '")'
                        };

                        return (
                            <li key={image._id} className='item' style={style}>
                                {this.removeIcon(image._id)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});