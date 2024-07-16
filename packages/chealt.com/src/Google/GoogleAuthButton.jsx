import classnames from 'classnames';
import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { getAuthUrl, retrieveTokens } from './utils';
import Button from '../Form/Button';
import Google from '../Icons/Google';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { add as addToast } from '../Toast/Toast';

import * as styles from './GoogleAuthButton.module.css';

const GoogleAuthButton = () => {
  const { t } = useTranslation();
  const [authUrl, setAuthUrl] = useState();

  const tokens = retrieveTokens();

  useEffect(() => {
    if (!authUrl && !tokens) {
      (async () => {
        try {
          setAuthUrl(getAuthUrl());
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);

          addToast({ message: t('google.authUrlError'), role: 'alert' });
        }
      })();
    }
  }, [t, authUrl, tokens]);

  if (!authUrl && !tokens) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Button
        ghost
        className={classnames({
          [styles.logo]: true,
          [styles.container]: true
        })}
        href={!tokens ? authUrl : undefined}
        isLink={!tokens}
        wide
      >
        <Google className={styles.logo} />
        {!tokens ? t('google.signIn') : t('google.signedIn')}
      </Button>
    </>
  );
};

export default GoogleAuthButton;
