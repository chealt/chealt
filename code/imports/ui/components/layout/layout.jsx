import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Header               from '../header/header';
import Drawer               from '../drawer';
import Home                 from '../../containers/home';
import Notification         from '../notification';
import AnythingCloser       from '../anything-closer';
import Footer               from './footer';
import StateToggler         from '../mixins/state-toggler';

const mapStateToProps = ({ notification }) => {
    return {
        text: notification.text,
        undoMethod: notification.undoMethod,
        shown: notification.shown
    };
};

const StatefullNotification = connect(mapStateToProps)(Notification);

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: false,
            filter: '',
            filtered: false
        };
    }

    componentWillMount() {
        document.title = this.props.title;  
    }

    filter(event) {
        this.setState({
            filter: event.target.value,
            filtered: !!event.target.value
        });
    }

    closeDrawer() {
        this.setState({
            isDrawerOpen: false
        });
    }

    anythingCloser() {
        if (this.state.isDrawerOpen) {
            return <AnythingCloser onClick={this.closeDrawer.bind(this)} />;
        }
    }

    render() {
        let contentContainerClasses = 'content-container';
        
        if (this.state.isDrawerOpen) {
            contentContainerClasses += ' background';
        }

        return (
            <div id='wrapper'>
                <Drawer
                    id='app-side-drawer'
                    items={this.props.menuItems}
                    isDrawerOpen={this.state.isDrawerOpen}
                    toggleDrawer={StateToggler.bind(this, 'isDrawerOpen')} />
                <div className={contentContainerClasses}>
                    <Header
                        toggleDrawer={StateToggler.bind(this, 'isDrawerOpen')}
                        filter={this.filter.bind(this)}
                        filtered={this.state.filtered} />
                    <StatefullNotification />
                    <Home
                        filter={this.state.filter} />
                </div>
                <Footer />
                {this.anythingCloser()}
            </div>
        );
    }
};

export default Layout;

Layout.propTypes = {
    title: React.PropTypes.string.isRequired
};
