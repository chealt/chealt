import { init } from './utils';
import {
    login as googleLogin,
    logout as googleLogout,
    isAuthenticated as isAuthenticatedWithGoogle,
    getAccessToken
} from './Google';

const GOOGLE_AUTH_TYPE = 'google';

const started = () => ({
    type: 'AUTH.STARTED'
});

const finished = () => ({
    type: 'AUTH.FINISHED'
});

const loaded = (isAuthenticated, authType, accessToken) => ({
    type: 'AUTH.LOADED',
    isAuthenticated,
    authType,
    accessToken
});

const login = () => async (dispatch) => {
    dispatch(started());

    await googleLogin();
    const isAuthenticated = isAuthenticatedWithGoogle();

    dispatch(loaded(isAuthenticated, GOOGLE_AUTH_TYPE));

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
    const accessToken = await getAccessToken();

    dispatch(loaded(isAuthenticated, GOOGLE_AUTH_TYPE, accessToken));

    dispatch(finished());
};

export { login, logout, initAuth, GOOGLE_AUTH_TYPE };
