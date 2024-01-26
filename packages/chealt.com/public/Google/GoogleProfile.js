import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';
import { useLocation } from 'preact-iso';

import GoogleAuthButton from './GoogleAuthButton';
import { clearTokens, getProfile, parseUrlHash, retrieveTokens, storeTokens } from './utils';
import Button from '../Form/Button';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ProfilePicture from '../ProfilePicture/ProfilePicture';

import * as styles from './GoogleProfile.module.css';

const GoogleProfile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const [profileError, setProfileError] = useState();

  const tokens = retrieveTokens();
  const hashParams = parseUrlHash();

  useEffect(() => {
    if (hashParams?.access_token) {
      storeTokens({
        accessToken: hashParams.access_token,
        scope: hashParams?.scope.split(' ')
      });

      // remove token from URL
      location.route('/integrations');

      setIsAuthenticated(true);
    }
  }, [hashParams, location]);

  useEffect(() => {
    if (tokens && !user && !profileError) {
      (async () => {
        setProfileError();

        try {
          const response = await getProfile(tokens);

          if (response.status === 401) {
            clearTokens();
            setProfileError(await response.text());

            return;
          }

          const responseJSON = await response.json();

          setUser(responseJSON);
        } catch {
          setProfileError('fail');
        }
      })();
    }
  }, [tokens, user, profileError]);

  if (!tokens && hashParams?.access_token && !user && !profileError) {
    return <LoadingIndicator />;
  }

  if (!user && tokens) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {!user && <GoogleAuthButton />}
      {user && (
        <>
          <div class={styles.userName}>
            <ProfilePicture name={user.name} src={user.picture} />
            {user.name}
            <Button
              onClick={() => {
                clearTokens();
                setUser();
                location.reload();
              }}
            >
              {t('common.signOut')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default GoogleProfile;
