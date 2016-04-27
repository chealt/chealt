import React, { Component } from 'react';
import IconButton           from './icon-button.jsx';

export default class ImageUploader extends Component {
    upload(event) {
        const successCallback = this.props.successCallback;

        FS.Utility.eachFile(event, (file) => {
            Images.insert(file, (error, fileObj) => {
                if (!error) {
                    successCallback(fileObj._id);
                }
            });
        });
    }

    triggerUpload() {
        this._fileInput.click();
    }

    render() {
        return (
            <div className='image-uploader-container'>
                <input
                    type='file'
                    multiple
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={this.upload.bind(this)}
                    ref={(ref) => this._fileInput = ref} />
                <IconButton
                    type='images'
                    action={this.triggerUpload.bind(this)}
                    additionalClasses='upload upper active centered'
                    text='add' />
            </div>
        );
    }
};

ImageUploader.propTypes = {
    successCallback: React.PropTypes.func.isRequired
};
