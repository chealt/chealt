import { login as auth0Login } from '../../Authentication/auth0';

const started = () => ({
    type: 'LOGIN.STARTED'
});

const login = () => {
    return async (dispatch) => {
        dispatch(started());

        await auth0Login();
    };
};

export { login };
