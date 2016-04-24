import React, { Component } from 'react';

class Home extends Component {
    mixins: [ReactMeteorData]

    getMeteorData() {
        return {
            events: Events.find(transformFilterInput(this.props.filter)).fetch()
        };
    }

    renderEvents() {
        return this.data.events.map((event) => {
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
});

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

export default Home;