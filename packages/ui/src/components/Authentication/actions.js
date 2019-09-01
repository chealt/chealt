import { init } from './utils';
import { login as googleLogin } from './Google';

const started = () => ({
    type: 'AUTH.STARTED'
});

const finished = () => ({
    type: 'AUTH.FINISHED'
});

const loaded = (isAuthenticated) => ({
    type: 'AUTH.LOADED',
    isAuthenticated
});

const login = () => async (dispatch) => {
    dispatch(started());

    await googleLogin();

    dispatch(finished());
};

const logout = () => async (dispatch) => {
    dispatch(started());

    dispatch(finished());
};

const initAuth = () => async (dispatch) => {
    dispatch(started());

    init();

    dispatch(loaded(false));

    dispatch(finished());
};

export { login, logout, initAuth };
