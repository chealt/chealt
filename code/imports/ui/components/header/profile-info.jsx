import React, { Component } from 'react';
import SportsIcon           from '../sports-icon.jsx';

export default class ProfileInfo extends Component {
    weight() {
        if (this.props.user.profile.weight) {
            return (
                <div className='weight'>
                    Weight: {this.props.user.profile.weight}
                </div>
            );
        }
    }

    activities() {
        if (this.props.user.profile.activityTypes) {
            return (
                <ul className='activities'>
                    {this.props.user.profile.activityTypes.map((activity) => {
                        return (
                            <li className='activity' key={activity._id}>
                                <SportsIcon activity={activity.name} />
                            </li>
                        );
                    })}
                </ul>
            );
        }
    }
    
    render() {
        return (
            <div className='profile-info'>
                <div className='name'>{this.props.user.profile.name}</div>
                <div className='email'>{this.props.user.profile.email}</div>
                {this.weight()}
                {this.activities()}
            </div>
        );
    }
};

ProfileInfo.propTypes = {
    user: React.PropTypes.object.isRequired
};
