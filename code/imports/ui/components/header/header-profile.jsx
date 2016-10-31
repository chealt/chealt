import React, { Component } from 'react';
import Profile              from './profile.jsx';
import Login                from './login.jsx';

export default class HeaderProfile extends Component {
    getModule() {
        if (this.props.user) {
            return <Profile user={this.props.user} />;
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
