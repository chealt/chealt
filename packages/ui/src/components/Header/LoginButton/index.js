import { connect } from 'react-redux';

import LoginButton from './LoginButton';

import { login } from './actions';

const mapDispatch = (dispatch) => ({
    login: () => {
        dispatch(login());
    }
});

export default connect(
    null,
    mapDispatch
)(LoginButton);
