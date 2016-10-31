import React    from 'react';
import Icon     from '../icon.jsx';

export default DrawerOpener = ({ toggleDrawer, id }) => (
    <button
        onClick={toggleDrawer}
        className='drawer-opener' htmlFor={id}>
        <Icon type='menu' />
    </button>
);

DrawerOpener.propTypes = {
    id: React.PropTypes.string.isRequired
};
