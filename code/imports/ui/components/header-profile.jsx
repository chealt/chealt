import React, { Component } from 'react';
import { Meteor }           from 'meteor/meteor';
import Profile              from './profile.jsx';
import Login                from './login.jsx';

export default class HeaderProfile extends Component {
    getModule() {
        if (Meteor.user()) {
            return <Profile user={Meteor.user()} />;
        } else {
            return <Login />;
        }
    }
    render() {
        return (
            <div id='header-profile-container'>{this.getModule()}</div>
        );
    }
};
