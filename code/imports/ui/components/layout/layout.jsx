import React, { Component } from 'react';
import Header               from '../header/header.jsx';
import Drawer               from '../drawer.jsx';
import Home                 from '../../containers/home.jsx';
import Notification         from '../notification.jsx';
import AnythingCloser       from '../anything-closer.jsx';
import Footer               from './footer.jsx';
import StateToggler         from '../mixins/state-toggler.jsx';

export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: false,
            filter: '',
            filtered: false,
            notification: '',
            showNotification: false,
            undoMethod: null
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

    showNotification({ text, undoMethod }) {
        this.setState({
            notification: text,
            undoMethod: undoMethod,
            showNotification: true
        });
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
                    <Notification
                        text={this.state.notification}
                        undoMethod={this.state.undoMethod}
                        shown={this.state.showNotification} />
                    <Home
                        filter={this.state.filter}
                        showNotification={this.showNotification.bind(this)} />
                </div>
                <Footer />
                {this.anythingCloser()}
            </div>
        );
    }
};

Layout.propTypes = {
    title: React.PropTypes.string.isRequired
};
