import React    from 'react';
import Profile  from './profile.jsx';
import Login    from './login.jsx';

const getModule = (user) => {
    if (user) {
        return <Profile user={user} />;
    } else {
        return <Login />;
    }
};

export default HeaderProfile = ({ user }) => (
    <div id='header-profile-container'>{getModule(user)}</div>
);
