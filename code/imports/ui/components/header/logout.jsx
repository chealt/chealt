import React        from 'react';
import { Meteor }   from 'meteor/meteor';

import MainButton   from '../common/buttons/main-button.jsx';

export default Logout = () => (
    <MainButton
        action={Meteor.logout}
        text='logout'
        additionalClasses='logout upper' />
);
