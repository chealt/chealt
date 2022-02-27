import createAuth0Client from '@auth0/auth0-spa-js';

import { user, isAuthenticated, popupOpen } from './store';
import config from './config';

let client;

const createClient = async () => {
  client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId // eslint-disable-line camelcase
  });

  return client;
};

const loginWithPopup = async (options) => {
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

const logout = () => client.logout();

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;
