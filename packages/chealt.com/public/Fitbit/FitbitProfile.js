import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import FitbitAuthButton from './FitbitAuthButton';
import { clearTokens, getProfile, retrieveTokens } from './utils';
import Button from '../Form/Button';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ProfilePicture from '../ProfilePicture/ProfilePicture';

import * as styles from './FitbitProfile.module.css';

const FitbitProfile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [profileError, setProfileError] = useState();

  const tokens = retrieveTokens();

  useEffect(() => {
    if (tokens && !user && !profileError) {
      (async () => {
        setProfileError();

        try {
          const response = await getProfile(tokens);
          const responseJSON = await response.json();

          if (response.ok) {
            setUser(responseJSON.user);
          } else if (responseJSON?.errors?.some((error) => error.errorType === 'expired_token')) {
            clearTokens();
            setUser(undefined);
          }
        } catch {
          setProfileError('fail');
        }
      })();
    }
  }, [tokens, user, profileError]);

  if (tokens && !user && !profileError) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {!user && <FitbitAuthButton />}
      {user && (
        <>
          <div class={styles.userName}>
            <ProfilePicture name={user.fullName} src={user.avatar} />
            {user.fullName}
            <Button
              onClick={() => {
                clearTokens();
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

export default FitbitProfile;
