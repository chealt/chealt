const loadAppState = (state) => ({
    type: 'APP.LOAD',
    state
});

const APP_STORAGE_KEY = 'CHEALT';

const initAppState = () => {
    return (dispatch) => {
        const state = window.localStorage.getItem(APP_STORAGE_KEY);

        dispatch(loadAppState(state));
    };
};

const initAuthentication = () => {
    return async () => {
        if (window.PasswordCredential || window.FederatedCredential) {
            const credentials = await navigator.credentials.get({
                password: true,
                federated: {
                    providers: ['https://accounts.google.com']
                },
                mediation: 'optional'
            });

            console.log(credentials);
        }
    };
};

export { initAppState, initAuthentication };
