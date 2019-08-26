import { initAuth0 } from './Authentication/auth0';

const initAuthentication = () => {
    return async () => {
        initAuth0();
    };
};

export { initAuthentication };
