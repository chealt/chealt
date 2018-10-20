import { connect } from 'react-redux';

import App from './app';

const mapState = ({ views: { currentView } }) => ({
    currentView
});

export default connect(mapState)(App);
