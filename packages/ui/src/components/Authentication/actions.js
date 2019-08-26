import { login as auth0Login, checkLoginStatus, initAuth0 } from './auth0';

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
    };
};

const initAuth = () => {
    return async (dispatch) => {
        dispatch(started());

        await initAuth0();
        const isAuthenticated = await checkLoginStatus();

        dispatch(loaded(isAuthenticated));

        dispatch(finished());
    };
};

export { login, initAuth };
