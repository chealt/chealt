ActivityList = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },
    itemContent(item, index) {
        if (item.unit) {
            return (
                <li key={index}>
                    <span className='value'>{item.value}</span>
                    <span className='unit'> {item.unit}</span>
                    <span className='name'> {item.name}</span>
                </li>
            );
        } else {
            return (
                <li key={index}>
                    <span className='value'>{item.value}</span>
                    <span className='name'> {item.name}</span>
                </li>
            );
        }
    },
    render() {
        return (
            <ul className='items activity-list rounded'>
                {this.props.items.map((item, index) => {
                    return this.itemContent(item, index);
                })}
            </ul>
        );
    }
});