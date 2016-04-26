import React            from 'react';
import ProfilePicture   from './profile-picture.jsx';

export default ProfileList = ({ containerClass, profileList }) => (
    <ul className={containerClass}>
        {profileList.map((profile) => {
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

ProfileList.propTypes = {
    profileList: React.PropTypes.array.isRequired,
    containerClass: React.PropTypes.string.isRequired
};
