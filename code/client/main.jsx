import { Meteor }       from 'meteor/meteor';
import React            from 'react';
import { render }       from 'react-dom';
import { Provider }     from 'react-redux';
import { createStore }  from 'redux';

import appReducers      from '../imports/ui/reducers';
import Layout           from '../imports/ui/components/layout/layout.jsx';

const menuItems = [
    { key: 0, name: 'Chealt', link: '/' },
    { key: 1, name: 'Profile', link: '/profile' }
];

let store = createStore(appReducers);

Meteor.startup(() => {
    GoogleMaps.load({ v: '3', key: 'AIzaSyA2jFaKDk6FkIdfyXxaN1pXT3fRQ1hoXkU' });
    render(
        <Provider store={store}>
            <Layout
                title='Chealt'
                menuItems={menuItems} />
        </Provider>,
        document.getElementById('app-root')
    );
});
