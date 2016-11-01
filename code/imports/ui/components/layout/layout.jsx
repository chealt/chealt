import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Header               from '../header/header';
import Drawer               from '../drawer';
import Home                 from '../../containers/home';
import Notification         from '../notification';
import AnythingCloser       from '../anything-closer';
import Footer               from './footer';
import StateToggler         from '../mixins/state-toggler';
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

        this.state = {
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
                    <Header
                        filter={this.filter.bind(this)}
                        filtered={this.state.filtered} />
                    <StatefullNotification />
                    <Home
                        filter={this.state.filter} />
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

const mapDrawerState = ({ isDrawerOpen }) => {
    return {
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

export default connect(mapDrawerState, mapDrawerDispatch)(Layout);

Layout.propTypes = {
    title: React.PropTypes.string.isRequired
};
