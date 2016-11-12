import React    from 'react';

import Tooltip  from './common/tooltip.jsx';

const profilePicture = (user, onPictureClick) => {
    if (user.picture) {
        style = { backgroundImage: `url(${user.picture})` };
    } else {
        style = { display: 'none' }
    }

    const initial = user.name.substring(0, 1);

    return (
        <span
            className='profile-picture'
            onClick={onPictureClick}>
            <span className='initial'>{initial}</span>
            <span className='picture' style={style}></span>
        </span>
    );
};

const element = (user, isTooltiped, onPictureClick) => {
    if (isTooltiped) {
        return (
            <Tooltip
                content={profilePicture(user, onPictureClick)}
                tooltipContent={user.name} />
        );
    } else {
        return profilePicture(user, onPictureClick);
    }
};

export default ProfilePicture = ({ user, isTooltiped, onPictureClick }) => (
    element(user, isTooltiped, onPictureClick)
);

ProfilePicture.propTypes = {
    user: React.PropTypes.object.isRequired,
    isTooltiped: React.PropTypes.bool,
    onPictureClick: React.PropTypes.func
};
