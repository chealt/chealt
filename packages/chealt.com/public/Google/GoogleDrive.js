import { useState, useEffect, useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import GoogleAuthButton from './GoogleAuthButton';
import { clearTokens, getFile, hasScopeAccess, retrieveTokens, uploadDriveData } from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { serializeAllData } from '../Share/utils';

const driveGoogleAuthScope = 'drive.appdata';

const GoogleDrive = () => {
  const { t } = useTranslation();
  const [driveData, setDriveData] = useState();
  const [, setDriveError] = useState();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { isLoading, items, save: saveSettings } = useObjectStore('settings');
  const { items: allData } = useObjectStore();
  const savedSettings = items?.filter(
    ({ value: { profileId } }) => profileId === selectedProfileId.value
  );
  const fileId = savedSettings?.find(({ key }) => key === 'googleDrive')?.value.fileId;

  const tokens = retrieveTokens();
  const hasDriveAccess = hasScopeAccess(driveGoogleAuthScope, tokens);

  useEffect(() => {
    if (tokens && !driveData) {
      (async () => {
        try {
          const response = await getFile({ accessToken: tokens.accessToken, fileId });

          if (response.status === 401) {
            clearTokens();
            setDriveError(await response.text());

            return;
          }

          const data = await response.json();
          const file = fileId ? data : data.files[0];

          console.log(file);
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
        data: serializeAllData(allData),
        fileId
      });

      if (response.status === 401) {
        clearTokens();
        setDriveError(response.text);

        return;
      }

      const { id } = await response.json();

      saveSettings({
        key: 'googleDrive',
        value: { profileId: selectedProfileId.value, fileId: id }
      });
    } catch {
      setDriveError('upload fail');
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {hasDriveAccess && (
        <Button onClick={uploadToGoogleDrive}>{t('pages.share.uploadToGoogleDrive')}</Button>
      )}
      {!hasDriveAccess && <GoogleAuthButton scopes={['drive.appdata']} />}
    </>
  );
};

export default GoogleDrive;
