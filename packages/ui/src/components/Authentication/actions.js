import { login as auth0Login } from './auth0';

const started = () => ({
    type: 'AUTH.STARTED'
});

const login = () => {
    return async (dispatch) => {
        dispatch(started());

        await auth0Login();
    };
};

export { login };
