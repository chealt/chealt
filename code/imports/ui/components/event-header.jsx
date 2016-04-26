import React, { Component } from 'react';
import Icon                 from './icon.jsx';
import FormatTime           from './helpers/format-time.jsx';

export default class EventHeader extends Component {
    getTime() {
        if (this.props.start.getTime() !== this.props.end.getTime()) {
            return (
                <div className='time-container row--m equal'>
                    <div className='start'>
                        <FormatTime date={this.props.start} />
                    </div>
                    <Icon type='clock3' additionalClasses='clock' />
                    <div className='end'>
                        <FormatTime date={this.props.end} />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='content-header row--m equal separated vertical'>
                <div className='host'>
                    <Icon type='user' position='before' />
                    <span className='text'>host: {this.props.hostName}</span>
                </div>
                {this.getTime()}
                <div className='location'>
                    <Icon type='earth2' position='before' />
                    {this.props.location}
                </div>
            </div>
        );
    }
}

EventHeader.propTypes = {
    hostName: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    start: React.PropTypes.object.isRequired,
    end: React.PropTypes.object.isRequired
};
