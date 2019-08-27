import { connect } from 'react-redux';

import LogoutButton from './LogoutButton';

import { logout } from '../actions';

const mapDispatch = (dispatch) => ({
    logout: () => {
        dispatch(logout());
    }
});

export default connect(
    null,
    mapDispatch
)(LogoutButton);
