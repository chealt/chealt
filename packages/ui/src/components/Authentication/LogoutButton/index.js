import { connect } from 'react-redux';

import LogoutButton from './LogoutButton';

import { logout } from '../actions';

const mapState = ({ authentication }) => ({
    authInProgress: authentication.inProgress
});

const mapDispatch = (dispatch) => ({
    logout: () => {
        dispatch(logout());
    }
});

export default connect(mapState, mapDispatch)(LogoutButton);
