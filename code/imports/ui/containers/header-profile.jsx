import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import HeaderProfile        from '../components/header/header-profile.jsx';

export default createContainer(({ params }) => {
    return {
        user: Meteor.user()
    };
}, HeaderProfile);