import createAuth0Client from '@auth0/auth0-spa-js';

import { user, isAuthenticated, popupOpen } from './store';
// eslint-lint-disable-next-line import/no-unresolved
import config from './config';

let client;

const createClient = async () => {
  client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId // eslint-disable-line camelcase
  });

  return client;
};

const login = async () => {
  popupOpen.set(true);

  try {
    await client.loginWithPopup();

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
};

const logout = () => client.logout();

const getAccessToken = () => client.getTokenSilently();

const auth = {
  createClient,
  getAccessToken,
  login,
  logout
};

export default auth;
