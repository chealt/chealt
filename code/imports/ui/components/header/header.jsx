import React            from 'react';
import { connect }      from 'react-redux';

import DrawerOpener     from './drawer-opener.jsx';
import Icon             from '../icon.jsx';
import HeaderProfile    from '../../containers/header-profile.jsx';
import { toggleDrawer } from '../../actions/drawer';
import { filter }       from '../../actions/filter';

const Header = ({ isFiltered, toggleDrawer, filter }) => {
    const searchIconClass = isFiltered ? 'filtered' : '';

    return (
        <div id='app-bar-container' className='shadow'>
            <div id='toggle-container'>
                <DrawerOpener
                    id='app-side-drawer'
                    toggleDrawer={toggleDrawer} />
            </div>
            <div id='filter-container' className='container rounded'>
                <Icon type='search' additionalClasses={searchIconClass} />
                <input 
                    id='header-filter'
                    placeholder='search'
                    aria-label='filter'
                    onChange={filter}
                    no-focus />
            </div>
            <div id='profile-container'>
                <HeaderProfile />
            </div>
        </div>
    );
};

const mapDispatch = (dispatch) => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer());
        },
        filter: (event) => {
            dispatch(filter(event.target.value));
        }
    };
};

const mapState = ({ filter }) => {
    return {
        isFiltered: filter.isFiltered
    };
};

export default connect(mapState, mapDispatch)(Header);

Header.propTypes = {
    toggleDrawer: React.PropTypes.func.isRequired,
    filter: React.PropTypes.func.isRequired,
    isFiltered: React.PropTypes.bool
};
