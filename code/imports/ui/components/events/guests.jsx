import React        from 'react';
import ProfileList  from '../profile-list.jsx';
import MainButton   from '../main-button.jsx';

const isUserAttending = (guests, user) => guests.some((guest) => guest._id === user._id);

const attendButton = (guests, user, attendMethod, unattendMethod) => {
    if (user) {
        const isAttending = isUserAttending(guests, user);
        const buttonAction = isAttending ? unattendMethod : attendMethod;
        const buttonText = isAttending ? 'cannot go' : 'going';
        const buttonClasses = isAttending ? 'unattend RSVP upper' : 'attend RSVP upper';

        return (
            <MainButton
                action={buttonAction}
                text={buttonText}
                additionalClasses={buttonClasses} />
        );
    }
};

const renderGuests = (guests) => {
    if (guests.length) {
        return (
            <ProfileList
                profileList={guests}
                containerClass='guests' />
        );
    }
};

export default Guests = ({ guests, user, attendMethod, unattendMethod }) => (
    <div className='guests-container'>
        {renderGuests(guests)}
        {attendButton(guests, user, attendMethod, unattendMethod)}
    </div>
);

Guests.propTypes = {
    guests: React.PropTypes.array.isRequired,
    attendMethod: React.PropTypes.func.isRequired,
    unattendMethod: React.PropTypes.func.isRequired
};
