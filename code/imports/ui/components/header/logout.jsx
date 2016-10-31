import React        from 'react';
import { Meteor }   from 'meteor/meteor';
import MainButton   from '../main-button.jsx';

export default Logout = () => (
    <MainButton
        action={Meteor.logout}
        text='logout'
        additionalClasses='logout upper' />
);
