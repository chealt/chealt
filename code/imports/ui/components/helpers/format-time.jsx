FormatTime = React.createClass({
    render() {
        var paddedHours = '0' + this.props.date.getHours(),
            paddedMinutes = '0' + this.props.date.getMinutes(),
            formattedTime = paddedHours.substr(-2) + ':' + paddedMinutes.substr(-2);

        return (
            <span className='time formatted'>{formattedTime}</span>
        );
    }
});