import React, { Component } from 'react';
import Header               from './header.jsx';
import Drawer               from '../drawer.jsx';
import Home                 from '../../containers/Home.jsx';
import AnythingCloser       from './anything-closer.jsx';
import Footer               from './footer.jsx';
import StateToggler         from '../mixins/state-toggler.jsx';

export default class Layout extends Component {
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
                        filter={this.filter}
                        filtered={this.state.filtered} />
                    <Home />
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
