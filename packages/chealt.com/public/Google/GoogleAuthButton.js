import classnames from 'classnames';
import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { allScopesAllowed, getAuthUrl, retrieveTokens } from './utils';
import Button from '../Form/Button';
import Google from '../Icons/Google';
import { add as addToast } from '../Toast/Toast';

import * as styles from './GoogleAuthButton.module.css';

const GoogleAuthButton = ({ scopes }) => {
  const { t } = useTranslation();
  const [authUrl, setAuthUrl] = useState();

  const tokens = retrieveTokens();
  const scopesAllowed = allScopesAllowed(scopes);

  useEffect(() => {
    if ((!authUrl && !tokens) || !scopesAllowed) {
      (async () => {
        try {
          setAuthUrl(getAuthUrl({ scopes }));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);

          addToast({ message: t('google.authUrlError'), role: 'alert' });
        }
      })();
    }
  }, [t, authUrl, tokens, scopes, scopesAllowed]);

  return (
    <Button
      className={classnames({
        [styles.logo]: true,
        [styles.container]: true
      })}
      href={!tokens || !scopesAllowed ? authUrl : undefined}
      isLink={!tokens || !scopesAllowed}
      wide
    >
      <Google className={styles.logo} />
      {!tokens || !scopesAllowed ? t('google.signIn') : t('google.signedIn')}
    </Button>
  );
};

export default GoogleAuthButton;
