import React, { Component } from 'react';
import ProfileList          from './profile-list.jsx';
import MainButton           from './main-button.jsx';

export default class Guests extends Component {
    currentUser() {
        return Meteor.user();
    }

    isAttending() {
        return this.props.guests.some((guest) => {
            return guest._id === this.currentUser()._id;
        });
    }

    attendButton() {
        if (this.currentUser()) {
            const isAttending = this.isAttending();
            const buttonAction = isAttending ? this.props.unattendMethod : this.props.attendMethod;
            const buttonText = isAttending ? 'cannot go' : 'going';
            const buttonClasses = isAttending ? 'unattend RSVP upper' : 'attend RSVP upper';

            return (
                <MainButton
                    action={buttonAction}
                    text={buttonText}
                    additionalClasses={buttonClasses} />
            );
        }
    }

    guests() {
        if (this.props.guests.length) {
            return (
                <ProfileList
                    profileList={this.props.guests}
                    containerClass='guests' />
            );
        }
    }

    render() {
        return (
            <div className='guests-container'>
                {this.guests()}
                {this.attendButton()}
            </div>
        );
    }
}

Guests.propTypes = {
    guests: React.PropTypes.array.isRequired,
    attendMethod: React.PropTypes.func.isRequired,
    unattendMethod: React.PropTypes.func.isRequired
};
