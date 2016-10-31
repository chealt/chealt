import React, { Component }     from 'react';
import DrawerOpener             from './drawer-opener.jsx';
import Icon                     from '../icon.jsx';
import HeaderProfile            from '../../containers/header-profile.jsx';

export default class Header extends Component {
    render() {
        const searchIconClass = this.props.filtered ? 'filtered' : '';

        return (
            <div id='app-bar-container' className='shadow'>
                <div id='toggle-container'>
                    <DrawerOpener
                        id='app-side-drawer'
                        toggleDrawer={this.props.toggleDrawer} />
                </div>
                <div id='filter-container' className='container rounded'>
                    <Icon type='search' additionalClasses={searchIconClass} />
                    <input 
                        id='header-filter'
                        placeholder='search'
                        aria-label='filter'
                        onChange={this.props.filter}
                        no-focus />
                </div>
                <div id='profile-container'>
                    <HeaderProfile />
                </div>
            </div>
        );
    }
};

Header.propTypes = {
    toggleDrawer: React.PropTypes.func.isRequired,
    filter: React.PropTypes.func.isRequired
};
