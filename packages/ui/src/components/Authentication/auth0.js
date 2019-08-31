import createAuth0Client from '@auth0/auth0-spa-js';

const CONFIG = {
    DOMAIN: 'dev-zyrt79q3.eu.auth0.com',
    CLIENT_ID: 'BiN1i6V1Uw0uYjwuXAUm7MB0tAOnYwI9'
};

let auth0;

const initAuth0 = async () => {
    auth0 = await createAuth0Client({
        domain: CONFIG.DOMAIN,
        client_id: CONFIG.CLIENT_ID
    });
};

const login = () => auth0.loginWithPopup();

const logout = () => {
    auth0.logout({
        returnTo: window.location.origin
    });
};

const getUser = () => auth0.getUser();

export { initAuth0, login, logout, getUser };
