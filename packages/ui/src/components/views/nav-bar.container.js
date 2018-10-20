import { connect } from 'react-redux';

import NavBar from './nav-bar';
import { changeCurrentView } from './actions';

const mapState = ({ views: { currentView } }) => ({
    currentView
});

const mapDispatch = (dispatch) => ({
    changeCurrentView: (name) => {
        dispatch(changeCurrentView(name));
    }
});

export default connect(mapState, mapDispatch)(NavBar);
