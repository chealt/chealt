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

const login = async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    });
};

const handleRedirect = () => {
    const query = window.location.search;

    if (query.includes('code=') && query.includes('state=')) {
        return auth0.handleRedirectCallback();
    }
};

const checkLoginStatus = () => auth0.isAuthenticated();

const cleanAuth0RedirectUrl = () => {
    window.history.replaceState({}, document.title, '/');
};

const logout = () => {
    auth0.logout({
        returnTo: window.location.origin
    });
};

export {
    initAuth0,
    login,
    logout,
    checkLoginStatus,
    handleRedirect,
    cleanAuth0RedirectUrl
};
