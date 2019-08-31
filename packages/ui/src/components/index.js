import { connect } from 'react-redux';

import App from './App';

const mapState = ({ authentication }) => ({
    isAuthenticated: authentication.isAuthenticated
});

export default connect(mapState)(App);
