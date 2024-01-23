import { useEffect, useState, useRef, useContext } from 'preact/hooks';
import { Trans, useTranslation } from 'preact-i18next';
import QrScanner from 'qr-scanner';

import { download, downloadAllUrl, upload } from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import Controls from '../Form/Controls';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { getFormData } from '../Form/utils';
import GoogleDrive from '../Google/GoogleDrive';
import { useObjectStore } from '../IndexedDB/hooks';
import Link from '../Link/Link';
import List from '../List/List';
import ListItem from '../List/ListItem';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Modal from '../Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import { sanitizeLoadedProfiles } from '../Profiles/utils';
import QRCode from '../QRCode/QRCode';
import { add as addToast } from '../Toast/Toast';

import styles from './Share.module.css';

const Share = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isModalOpen, setIsModalOpen] = useState();
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [loadingDownloadUrl, setLoadingDownloadUrl] = useState();
  const ref = useRef();
  const { items, isLoading: isLoadingData, save } = useObjectStore();
  const { items: profiles, save: saveProfile } = useObjectStore('profiles');
  const {
    items: settings,
    isLoading: isLoadingSettings,
    save: saveSettings
  } = useObjectStore('settings');
  const savedSettings = settings?.filter(
    ({ value: { profileId } }) => profileId === selectedProfileId.value
  );
  const [inputEncryptData, setEncryptData] = useState(false);
  const encryptData =
    savedSettings?.find(({ key }) => key === 'encryptData')?.value.encryptData || inputEncryptData;
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState();
  const password = savedSettings?.find(({ key }) => key === 'password')?.value.password || '';

  const savePassword = (event) => {
    event.preventDefault();

    const data = getFormData(event.target);

    setIsPasswordModalOpen(false);
    saveSettings({
      key: 'password',
      value: { profileId: selectedProfileId.value, password: data.password }
    });
  };

  const uploadContent = async () => {
    setLoadingDownloadUrl(true);

    try {
      const downloadUrl = await upload(items, { encryptData, password });

      setDownloadUrl(downloadUrl);
      setIsQRCodeModalOpen(true);
      setLoadingDownloadUrl(false);
      addToast({ message: 'Upload successful' });
    } catch {
      setLoadingDownloadUrl(false);
      addToast({ message: 'Upload failed', role: 'alert' });
    }
  };

  useEffect(() => {
    const videoElement = ref.current;
    let qrScanner;

    if (!qrScanner && isModalOpen) {
      qrScanner = new QrScanner(
        videoElement,
        async ({ data: url }) => {
          qrScanner.stop();

          try {
            const data = await download(url, { encryptData, password });

            await sanitizeLoadedProfiles({ profiles, loadedProfiles: data.profiles, saveProfile });

            await save(data);

            addToast({ message: 'Download successful' });
          } catch (error) {
            addToast({ message: 'Download failed', role: 'alert' });
          }

          setIsModalOpen(false);
        },
        {}
      );

      qrScanner.start();
    }

    if (qrScanner && !isModalOpen) {
      qrScanner.stop();
    }

    return () => {
      if (qrScanner) {
        qrScanner.stop();
        qrScanner.destroy();
      }
    };
    // profiles is missing from the deps because loading the profiles updates the current ones
  }, [isModalOpen, save, saveProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  const isLoading = isLoadingData || isLoadingSettings;

  return (
    <>
      <PageTitle>{t('pages.share.title')}</PageTitle>
      <p>
        {t('pages.share.instructions.title')}
        <List>
          <ListItem>{t('pages.share.instructions.step1')}</ListItem>
          <ListItem>{t('pages.share.instructions.step2')}</ListItem>
          <ListItem>
            <Trans key="pages.share.instructions.step3">
              Open the <Link href="https://chealt.com/share">Chealt Share page</Link> on the device
              you want to share your data with
            </Trans>
          </ListItem>
          <ListItem>{t('pages.share.instructions.step4')}</ListItem>
        </List>
      </p>
      <p>{t('pages.share.instructions.after')}</p>
      <p>
        <Trans key="pages.share.instructions.privacyWarning">
          <b>PRIVACY WARNING</b>: When using the share functionality, your data temporarily (for an
          hour) will be stored on our servers.
        </Trans>
      </p>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Controls>
          <Input
            type="checkbox"
            name="encryptData"
            checked={encryptData}
            onChange={(event) => {
              setEncryptData(event.target.checked);
              saveSettings({
                key: 'encryptData',
                value: { profileId: selectedProfileId.value, encryptData: event.target.checked }
              });
            }}
          >
            {t('common.encryptData')}
          </Input>
          <Button disabled={!encryptData} onClick={() => setIsPasswordModalOpen(true)}>
            {t('common.setPassword')}
          </Button>
          <Button
            emphasized
            onClick={uploadContent}
            disabled={loadingDownloadUrl || (encryptData && !password)}
          >
            {t('common.share')}
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>{t('common.scanQRCode')}</Button>
          <Button
            href={downloadAllUrl({ data: items })}
            download="chealt.json"
            target="_blank"
            isLink
          >
            {t('pages.share.download')}
          </Button>
          <GoogleDrive />
        </Controls>
      )}
      <Modal isOpen={isPasswordModalOpen} close={() => setIsPasswordModalOpen(false)}>
        <Form name="password" onSubmit={savePassword}>
          <Input type="password" name="password" autocomplete="password" value={password}>
            {t('common.password')}
          </Input>
          <Button type="submit" emphasized>
            {t('common.savePassword')}
          </Button>
        </Form>
      </Modal>
      <Modal isOpen={isQRCodeModalOpen} close={() => setIsQRCodeModalOpen(false)} isCentered>
        {downloadUrl && <QRCode data={downloadUrl} />}
      </Modal>
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)} isCentered>
        <video class={styles.video} ref={ref} />
      </Modal>
    </>
  );
};

export default Share;
