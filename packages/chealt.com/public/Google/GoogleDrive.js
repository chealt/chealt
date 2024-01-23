import { useState, useEffect, useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import GoogleAuthButton from './GoogleAuthButton';
import { clearTokens, retrieveTokens, uploadDriveData } from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { serializeAllData } from '../Share/utils';

const GoogleDrive = () => {
  const { t } = useTranslation();
  const [driveData, setDriveData] = useState();
  const [, setDriveError] = useState();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { isLoading, items } = useObjectStore('settings');
  const { items: allData } = useObjectStore();
  const savedSettings = items?.filter(
    ({ value: { profileId } }) => profileId === selectedProfileId.value
  );
  const driveFileIDs = savedSettings?.find(({ key }) => key === 'driveFileIDs')?.value.driveFileIDs;

  const tokens = retrieveTokens();

  useEffect(() => {
    if (tokens && !driveData) {
      (async () => {
        try {
          // const response = await getDriveData({ accessToken: tokens.accessToken });
          // console.log({ response });
          // setDriveData(await response.json());
        } catch {
          setDriveError('fail');
        }
      })();
    }
  }, [tokens, driveData]);

  const uploadToGoogleDrive = async () => {
    try {
      const response = await uploadDriveData({
        accessToken: tokens.accessToken,
        data: serializeAllData(allData)
      });

      if (response.status === 401) {
        clearTokens();
        setDriveError(response.text);

        return;
      }

      console.log({ response });
    } catch {
      setDriveError('upload fail');
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {tokens && !driveFileIDs && (
        <Button onClick={uploadToGoogleDrive}>{t('pages.share.uploadToGoogleDrive')}</Button>
      )}
      {!tokens && <GoogleAuthButton scopes={['drive.appdata']} />}
    </>
  );
};

export default GoogleDrive;
