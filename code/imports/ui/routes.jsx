import React        from 'react';
import { Meteor }   from 'meteor/meteor';
import { mount }    from 'react-mounter';
import { render }   from 'react-dom';
import Home         from '../imports/ui/Home.jsx';

const menuItems = [
    { key: 0, name: 'Chealt', link: '/' },
    { key: 1, name: 'Profile', link: '/profile' }
];


Meteor.startup(() => {
    render(
        <Home />
    )
};