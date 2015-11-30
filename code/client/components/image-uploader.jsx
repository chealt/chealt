ImageUploader = React.createClass({
    propTypes: {
        successCallback: React.PropTypes.func.isRequired
    },
    upload(event) {
        const successCallback = this.props.successCallback;

        FS.Utility.eachFile(event, (file) => {
            Images.insert(file, (error, fileObj) => {
                if (!error) {
                    successCallback(fileObj._id);
                }
            });
        });
    },
    triggerUpload() {
        this._fileInput.getDOMNode().click();
    },
    render() {
        return (
            <div className='image-uploader-container'>
                <input
                    type='file'
                    multiple
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={this.upload}
                    ref={(ref) => this._fileInput = ref} />
                <MainButton
                    action={this.triggerUpload}
                    text='' />
            </div>
        );
    }
});