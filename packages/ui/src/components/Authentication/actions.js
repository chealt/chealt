import {
    getUser,
    login as auth0Login,
    logout as auth0Logout,
    initAuth0
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

const login = () => async (dispatch) => {
    dispatch(started());

    await auth0Login();
    const user = await getUser();

    dispatch(loaded(Boolean(user)));

    dispatch(finished());
};

const logout = () => async (dispatch) => {
    dispatch(started());

    await auth0Logout();

    dispatch(finished());
};

const initAuth = () => async (dispatch) => {
    dispatch(started());

    await initAuth0();
    const user = await getUser();

    dispatch(loaded(Boolean(user)));

    dispatch(finished());
};

export { login, logout, initAuth };
