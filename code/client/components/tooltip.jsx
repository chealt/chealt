Tooltip = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
        tooltipContent: React.PropTypes.node.isRequired
    },
    render() {
        let tooltipClass = 'tooltip';

        if (this.props.side) {
            tooltipClass += ' ' + this.props.side;
        } else {
            tooltipClass += ' right';
        }

        return (
            <div className='tooltiped'>
                {this.props.content}
                <span className={tooltipClass}>{this.props.tooltipContent}</span>
            </div>
        );
    }
});