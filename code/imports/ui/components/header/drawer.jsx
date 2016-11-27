import React            from 'react';
import { connect }      from 'react-redux';

import DrawerOpener     from './drawer-opener.jsx';
import { toggleDrawer } from '../../actions/drawer';

const Drawer = ({ toggleDrawer, isDrawerOpen, id, items }) => {
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

const mapDrawerState = ({ isDrawerOpen }) => {
    return {
        isDrawerOpen
    };
};

const mapDrawerDispatch = (dispatch) => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer());
        }
    };
};

export default connect(mapDrawerState, mapDrawerDispatch)(Drawer);

Drawer.propTypes = {
    id: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired,
    isDrawerOpen: React.PropTypes.bool
};