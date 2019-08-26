import { connect } from 'react-redux';

import App from './App';

const mapState = ({ authentication }) => ({
    hideLogin: Boolean(authentication.inProgress)
});

export default connect(mapState)(App);
