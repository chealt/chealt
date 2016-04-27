import React        from 'react';
import { Meteor }   from 'meteor/meteor';
import { render }   from 'react-dom';
import Layout       from '../imports/ui/components/layout/layout.jsx';

const menuItems = [
    { key: 0, name: 'Chealt', link: '/' },
    { key: 1, name: 'Profile', link: '/profile' }
];

Meteor.startup(() => {
    GoogleMaps.load({ v: '3', key: 'AIzaSyA2jFaKDk6FkIdfyXxaN1pXT3fRQ1hoXkU' });
    render(
        <Layout
            title='Chealt'
            menuItems={menuItems} />,
        document.getElementById('app-root')
    );
});
