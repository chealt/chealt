import React, { Component } from 'react';
import { connect }          from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import Footer               from './footer';
import Header               from '../header/header';
import Drawer               from '../header/drawer';
import Notification         from '../common/notification';
import AnythingCloser       from '../common/anything-closer';
import StateToggler         from '../mixins/state-toggler';
import Home                 from '../../containers/home';
import { closeDrawer }      from '../../actions/drawer';

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
                    <Notification />
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

const mapDispatch = (dispatch) => {
    return {
        closeDrawer: () => {
            dispatch(closeDrawer());
        }
    };
};

export default connect(mapState, mapDispatch)(Layout);

Layout.propTypes = {
    title: React.PropTypes.string.isRequired
};
