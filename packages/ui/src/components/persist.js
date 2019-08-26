const APP_STORAGE_KEY = 'CHEALT';

const preloadState = () => {
    const state = window.localStorage.getItem(APP_STORAGE_KEY);
    const parsedState = state ? JSON.parse(state) : undefined;

    return parsedState;
};

const saveState = (state) => {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
};

export { preloadState, saveState };
