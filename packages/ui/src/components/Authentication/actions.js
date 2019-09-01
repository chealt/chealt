import { init } from './utils';
import {
    login as googleLogin,
    logout as googleLogout,
    isAuthenticated as isAuthenticatedWithGoogle
} from './Google';

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
    const isAuthenticated = isAuthenticatedWithGoogle();

    dispatch(loaded(isAuthenticated));

    dispatch(finished());
};

const logout = () => async (dispatch) => {
    dispatch(started());

    await googleLogout();
    const isAuthenticated = isAuthenticatedWithGoogle();

    dispatch(loaded(isAuthenticated));

    dispatch(finished());
};

const initAuth = () => async (dispatch) => {
    dispatch(started());

    await init();
    const isAuthenticated = isAuthenticatedWithGoogle();

    dispatch(loaded(isAuthenticated));

    dispatch(finished());
};

export { login, logout, initAuth };
