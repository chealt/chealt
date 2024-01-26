import { useState, useEffect, useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import GoogleAuthButton from './GoogleAuthButton';
import {
  clearTokens,
  downloadFile,
  getFile,
  hasScopeAccess,
  retrieveTokens,
  uploadDriveMetaData
} from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { sanitizeLoadedProfiles } from '../Profiles/utils';
import { serializeAllData } from '../Share/utils';
import { add as addToast } from '../Toast/Toast';

import * as styles from './GoogleDrive.module.css';

const driveGoogleAuthScope = 'drive.appdata';

const GoogleDrive = () => {
  const { t } = useTranslation();
  const [driveData, setDriveData] = useState();
  const [, setDriveError] = useState();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items: allData, save } = useObjectStore();
  const { isLoading, items, save: saveSettings } = useObjectStore('settings');
  const { items: profiles, save: saveProfile } = useObjectStore('profiles');
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

          const downloadResponse = await downloadFile({
            accessToken: tokens.accessToken,
            fileId: file.id
          });
          const fileData = await downloadResponse.json();

          setDriveData(fileData);
        } catch {
          setDriveError('fail');
        }
      })();
    }
  }, [tokens, driveData, fileId]);

  const uploadToGoogleDrive = async () => {
    try {
      const response = await uploadDriveMetaData({
        accessToken: tokens.accessToken,
        data: serializeAllData(allData),
        fileId
      });

      if (response.status === 401) {
        clearTokens();
        setDriveError(await response.text());

        return;
      }

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { id } = await response.json();

      saveSettings({
        key: 'googleDrive',
        value: { profileId: selectedProfileId.value, fileId: id }
      });

      addToast({ message: t('pages.share.uploadSuccess') });
    } catch {
      addToast({ message: t('pages.share.uploadFailure'), role: 'alert' });
      setDriveError('upload fail');
    }
  };

  const overwriteWithGoogleDrive = async () => {
    try {
      await sanitizeLoadedProfiles({ profiles, loadedProfiles: driveData.profiles, saveProfile });

      await save(driveData);

      addToast({ message: t('pages.share.overwriteSuccess') });
    } catch {
      addToast({ message: t('pages.share.overwriteFailure'), role: 'alert' });
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div class={styles.container}>
      {hasDriveAccess && (
        <>
          <Button onClick={uploadToGoogleDrive} wide>
            {t('pages.share.uploadToGoogleDrive')}
          </Button>
          {driveData && (
            <Button onClick={overwriteWithGoogleDrive} wide>
              {t('pages.share.overwriteFromGoogleDrive')}
            </Button>
          )}
        </>
      )}
      {!hasDriveAccess && <GoogleAuthButton scopes={['drive.appdata']} />}
    </div>
  );
};

export default GoogleDrive;
