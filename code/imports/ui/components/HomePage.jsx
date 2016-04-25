import React, { Component }     from 'react';
import Event                    from './event.jsx';

export default class HomePage extends Component {
    getMeteorData() {
        return {
            events: Events.find(transformFilterInput(this.props.filter)).fetch()
        };
    }

    renderEvents() {
        return this.props.events.map((event) => {
            return (
                <Event
                    key={event._id}
                    event={event} />
            );
        });
    }

    render() {
        return (
            <div className='cards-container padded'>
                {this.renderEvents()}
            </div>
        );
    }
}

HomePage.propTypes = {
    filter: React.PropTypes.string,
    events: React.PropTypes.array
};

const transformFilterInput = (input) => {
    let transformedFilter = {};

    if (input) {
        const beginWithRegExp = (new RegExp(input, 'i'));

        transformedFilter = {
            $or: [
                { name: beginWithRegExp },
                { host: beginWithRegExp },
                { location: beginWithRegExp }
            ]
        };
    }

    return transformedFilter;
};