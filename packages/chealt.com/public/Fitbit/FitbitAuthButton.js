import { getOAuthChallenge } from '@chealt/browser-utils';
import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';
import { useLocation } from 'preact-iso';

import {
  clearVerifier,
  getAuthTokens,
  getAuthUrl,
  retrieveTokens,
  retrieveVerifier,
  storeTokens,
  storeVerifier
} from './utils';
import Button from '../Form/Button';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { add as addToast } from '../Toast/Toast';

import * as styles from './FitbitAuthButton.module.css';

const FitbitAuthButton = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [authUrl, setAuthUrl] = useState();
  const [authError, setAuthError] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifier = retrieveVerifier();
  const tokens = retrieveTokens();

  useEffect(() => {
    if (location.query?.code && !verifier) {
      location.route('/integrations');
    }
  }, [location.query?.code, verifier, location]);

  useEffect(() => {
    if (!authUrl && !location.query?.code && !tokens && !isAuthenticated) {
      (async () => {
        try {
          const oauth = await getOAuthChallenge();

          storeVerifier(oauth.verifier);
          setAuthUrl(getAuthUrl(oauth.challenge));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);

          addToast({ message: t('fitbit.authUrlError'), role: 'alert' });
        }
      })();
    }
  }, [t, verifier, authUrl, location.query?.code, tokens, isAuthenticated]);

  useEffect(() => {
    if (!tokens && location.query?.code && verifier) {
      (async () => {
        setAuthError(false);

        try {
          const code = location.query.code;
          const authTokenResponse = await getAuthTokens({ code, verifier });
          const response = await authTokenResponse.json();

          if (
            response.errors ||
            (response.scope !== 'profile' && !response.scope.includes('profile'))
          ) {
            throw new Error(response.errors.map(({ message }) => message).join(', '));
          }

          storeTokens({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            scope: response.scope,
            userId: response.user_id
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);

          setAuthError(true);
          addToast({ message: t('fitbit.authTokenError'), role: 'alert' });
        }

        clearVerifier();
        setIsAuthenticated(true);
      })();
    }
  }, [t, verifier, tokens, location.query]);

  if (!authUrl && !tokens) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Button
        ghost
        className={styles.container}
        href={!tokens ? authUrl : undefined}
        isLink={!tokens}
      >
        {location.query?.code && !tokens && !authError && <LoadingIndicator size="small" wide />}
        <img class={styles.logo} src="/Fitbit/Fitbit_app_icon.png" alt={t('fitbit.iconAlt')} />
        {!tokens ? t('fitbit.signIn') : t('fitbit.signedIn')}
      </Button>
    </>
  );
};

export default FitbitAuthButton;
