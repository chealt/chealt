import {
    login as auth0Login,
    logout as auth0Logout,
    checkLoginStatus,
    initAuth0,
    handleRedirect,
    cleanAuth0RedirectUrl
} from './auth0';

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

const login = () => {
    return async (dispatch) => {
        dispatch(started());

        await auth0Login();

        dispatch(finished());
    };
};

const logout = () => {
    return async (dispatch) => {
        dispatch(started());

        await auth0Logout();

        dispatch(finished());
    };
};

const initAuth = () => {
    return async (dispatch) => {
        dispatch(started());

        await initAuth0();
        await handleRedirect();
        const isAuthenticated = await checkLoginStatus();

        if (isAuthenticated) {
            cleanAuth0RedirectUrl();
        }

        dispatch(loaded(isAuthenticated));

        dispatch(finished());
    };
};

export { login, logout, initAuth };
