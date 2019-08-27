import { connect } from 'react-redux';

import App from './App';

const mapState = ({ authentication }) => ({
    authInProgress: authentication.inProgress,
    isAuthenticated: authentication.isAuthenticated
});

export default connect(mapState)(App);
