import React        from 'react';
import DrawerOpener from './header/drawer-opener.jsx';

export default Drawer = ({ toggleDrawer, isDrawerOpen, id, items }) => {
    let className = 'side-drawer shadow';
    
    if (isDrawerOpen) {
        className += ' open';
    }

    return (
        <div id={id} className={className}>
            <DrawerOpener
                id='app-side-drawer'
                toggleDrawer={toggleDrawer} />
            <ul className='items'>
                {items.map(function (item) {
                    return (
                        <li key={item.key}>
                            <a
                                className='item'
                                href={item.link}
                                onClick={toggleDrawer}>{item.name}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

Drawer.propTypes = {
    id: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired,
    isDrawerOpen: React.PropTypes.bool
};
