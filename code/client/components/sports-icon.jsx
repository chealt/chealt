SportsIcon = React.createClass({
    propTypes: {
        activity: React.PropTypes.string.isRequired
    },
    render() {
        const iconClass = 'sports-icon ' + this.props.activity;

        return (<span className={iconClass}></span>);
    }
});