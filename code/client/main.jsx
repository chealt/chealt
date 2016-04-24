import React        from 'react';
import { Meteor }   from 'meteor/meteor';
import { render }   from 'react-dom';
import Home         from '../imports/ui/components/Home.jsx';

const menuItems = [
    { key: 0, name: 'Chealt', link: '/' },
    { key: 1, name: 'Profile', link: '/profile' }
];


Meteor.startup(() => {
    render(
        <Home />,
        document.getElementById('app-root')
    );
});
