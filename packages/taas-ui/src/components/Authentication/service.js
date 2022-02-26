import createAuth0Client from '@auth0/auth0-spa-js';

import { user, isAuthenticated, popupOpen } from './store';
import config from './config';

const createClient = async () => {
  const auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId // eslint-disable-line camelcase
  });

  return auth0Client;
};

const loginWithPopup = async (client, options) => {
  popupOpen.set(true);

  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
};

const logout = (client) => client.logout();

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;
