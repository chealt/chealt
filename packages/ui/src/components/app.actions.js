import { initAuth0 } from './Authentication/auth0';

const loadAppState = (state) => ({
    type: 'APP.LOAD',
    state
});

const APP_STORAGE_KEY = 'CHEALT';

const initAppState = () => {
    return (dispatch) => {
        const state = window.localStorage.getItem(APP_STORAGE_KEY);
        const parsedState = state ? JSON.parse(state) : undefined;

        dispatch(loadAppState(parsedState));
    };
};

const initAuthentication = () => {
    return async () => {
        initAuth0();
    };
};

const saveAppState = (state) => {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
};

export { initAppState, initAuthentication, saveAppState };
