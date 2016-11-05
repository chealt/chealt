import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Footer               from './footer';
import Header               from '../header/header';
import Drawer               from '../drawer';
import Notification         from '../notification';
import AnythingCloser       from '../anything-closer';
import StateToggler         from '../mixins/state-toggler';
import Home                 from '../../containers/home';
import { closeDrawer }      from '../../actions/drawer';

const mapNotificationState = ({ notification }) => {
    return {
        text: notification.text,
        undoMethod: notification.undoMethod,
        shown: notification.shown
    };
};

const StatefullNotification = connect(mapNotificationState)(Notification);

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = this.props.title;  
    }

    anythingCloser() {
        if (this.props.isDrawerOpen) {
            return <AnythingCloser onClick={this.props.closeDrawer} />;
        }
    }

    render() {
        let contentContainerClasses = 'content-container';
        
        if (this.props.isDrawerOpen) {
            contentContainerClasses += ' background';
        }

        return (
            <div id='wrapper'>
                <div className={contentContainerClasses}>
                    <Header />
                    <StatefullNotification />
                    <Home filter={this.props.filter} />
                </div>
                <Footer />
                {this.anythingCloser()}
                <Drawer
                    id='app-side-drawer'
                    items={this.props.menuItems} />
            </div>
        );
    }
};

const mapState = ({ isDrawerOpen, filter }) => {
    return {
        filter: filter.filter,
        isDrawerOpen
    };
};

const mapDrawerDispatch = (dispatch) => {
    return {
        closeDrawer: () => {
            dispatch(closeDrawer());
        }
    };
};

export default connect(mapState, mapDrawerDispatch)(Layout);

Layout.propTypes = {
    title: React.PropTypes.string.isRequired
};
