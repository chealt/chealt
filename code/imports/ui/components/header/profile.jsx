import React, { Component } from 'react';
import { connect }          from 'react-redux';

import ProfileInfo          from './profile-info';
import Logout               from './logout';
import ProfilePicture       from '../profile-picture';
import AnythingCloser       from '../common/anything-closer';
import Bubble               from '../common/bubble';
import BubbleArrow          from '../common/bubble-arrow';
import {
    toggleProfileBubble,
    closeProfileBubble
} from '../../actions/profile';

const anythingCloser = (isBubbleShown, closeProfileBubble) => {
    if (isBubbleShown) {
        return <AnythingCloser onClick={closeProfileBubble} />;
    }
};

const getBubbleContent = (profile) => (
    <div className='profile-bubble-content'>
        <ProfileInfo
            profile={profile} />
        <Logout />
    </div>
);

const Profile = ({ user, toggleProfileBubble, closeProfileBubble, isBubbleShown }) => (
    <div className='profile-container bubble-container'>
        <ProfilePicture
            user={user.profile}
            onPictureClick={toggleProfileBubble} />
        <BubbleArrow
            position='below'
            isShown={isBubbleShown} />
        <Bubble
            position='below'
            isShown={isBubbleShown}
            content={getBubbleContent(user.profile)} />
        {anythingCloser(isBubbleShown, closeProfileBubble)}
    </div>
);

const mapState = ({ profile }) => {
    return {
        isBubbleShown: profile.isBubbleShown
    };
};

const mapDispatch = (dispatch) => {
    return {
        toggleProfileBubble: () => {
            dispatch(toggleProfileBubble());
        },
        closeProfileBubble: () => {
            dispatch(closeProfileBubble());
        }
    }
};

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
    user: React.PropTypes.object.isRequired
};
