import React        from 'react';
import SportsIcon   from '../sports-icon.jsx';

const renderWeight = (weight) => {
    if (weight) {
        return (
            <div className='weight'>
                Weight: {weight}
            </div>
        );
    }
};

const activities = (activityTypes) => {
    if (activityTypes) {
        return (
            <ul className='activities'>
                {activityTypes.map((activity) => {
                    return (
                        <li className='activity' key={activity._id}>
                            <SportsIcon activity={activity.name} />
                        </li>
                    );
                })}
            </ul>
        );
    }
};

export default ProfileInfo = ({ profile }) => (
    <div className='profile-info'>
        <div className='name'>{profile.name}</div>
        <div className='email'>{profile.email}</div>
        {renderWeight(profile.weight)}
        {activities(profile.activityTypes)}
    </div>
);

ProfileInfo.propTypes = {
    profile: React.PropTypes.object.isRequired
};
