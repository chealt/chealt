import { load as loadFeelings } from './FeelingsForm/actions';

const initAppState = () => {
    return (dispatch) => {
        dispatch(loadFeelings());
    };
};

const initAuthentication = () => {
    return async () => {
        if (window.PasswordCredential || window.FederatedCredential) {
            const credentials = await navigator.credentials.get({
                password: true,
                federated: {
                    providers: [
                        'https://accounts.google.com'
                    ]
                },
                mediation: 'optional'
            });

            console.log(credentials);
        }
    };
};

export {
    initAppState,
    initAuthentication
};
