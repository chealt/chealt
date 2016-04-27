import React, { Component } from 'react';
import AnythingCloser       from './layout/anything-closer.jsx';
import ProfilePicture       from './profile-picture.jsx';
import ProfileInfo          from './profile-info.jsx';
import Logout               from './logout.jsx';
import Bubble               from './bubble.jsx';
import BubbleArrow          from './bubble-arrow.jsx';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isBubbleShown: false
        };
    }

    toggleBubble() {
        this.setState({
            isBubbleShown: !this.state.isBubbleShown
        });
    }

    closeBubble() {
        this.setState({
            isBubbleShown: false
        });
    }

    anythingCloser() {
        if (this.state.isBubbleShown) {
            return <AnythingCloser onClick={this.closeBubble.bind(this)} />;
        }
    }

    getBubbleContent() {
        return (
            <div className='profile-bubble-content'>
                <ProfileInfo
                    user={this.props.user} />
                <Logout />
            </div>
        );
    }

    render() {
        return (
            <div className='profile-container bubble-container'>
                <ProfilePicture
                    user={this.props.user.profile}
                    onClick={this.toggleBubble.bind(this)} />
                <BubbleArrow
                    position='below'
                    isShown={this.state.isBubbleShown} />
                <Bubble
                    position='below'
                    isShown={this.state.isBubbleShown}
                    content={this.getBubbleContent()} />
                {this.anythingCloser()}
            </div>
        );
    }
};

Profile.propTypes = {
    user: React.PropTypes.object.isRequired
};
