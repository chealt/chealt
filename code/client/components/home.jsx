Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            events: Events.find({}).fetch()
        };
    },
    renderEvents() {
        return this.data.events.map((event) => {
            return (
                <Event key={event._id} event={event} />
            );
        });
    },
    render() {
        return (
            <div id="events-container">
                {this.renderEvents()}
            </div>
        );
    }
});