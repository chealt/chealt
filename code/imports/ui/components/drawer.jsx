import React, { Component } from 'react';
import DrawerOpener         from './header/drawer-opener.jsx';

export default class Drawer extends Component {
    render() {
        let className = 'side-drawer shadow';
        const toggleDrawer = this.props.toggleDrawer;

        if (this.props.isDrawerOpen) {
            className += ' open';
        }

        return (
            <div id={this.props.id} className={className}>
                <DrawerOpener
                    id='app-side-drawer'
                    toggleDrawer={this.props.toggleDrawer} />
                <ul className='items'>
                    {this.props.items.map(function (item) {
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
    }
};

Drawer.propTypes = {
    id: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
};
