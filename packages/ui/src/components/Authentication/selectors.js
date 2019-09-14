import { createSelector } from 'reselect';

import { GOOGLE_AUTH_TYPE } from './actions';

const authTypeSelector = (state) => state.authentication.authType;
const isAuthenticatedSelector = (state) => state.authentication.isAuthenticated;
const accessTokenSelector = (state) => state.authentication.accessToken;

const googleAccessTokenSelector = createSelector(
    [authTypeSelector, isAuthenticatedSelector, accessTokenSelector],
    (authType, isAuthenticated, accessToken) =>
        isAuthenticated && authType === GOOGLE_AUTH_TYPE && accessToken
);

export { googleAccessTokenSelector };
