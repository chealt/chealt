import { connect } from 'react-redux';

import LoginButton from './LoginButton';

import { login } from '../actions';

const mapState = ({ authentication }) => ({
    authInProgress: authentication.inProgress
});

const mapDispatch = (dispatch) => ({
    login: () => {
        dispatch(login());
    }
});

export default connect(mapState, mapDispatch)(LoginButton);
