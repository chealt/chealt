import { useEffect, useState, useRef, useContext } from 'preact/hooks';
import QrScanner from 'qr-scanner';

import { download, upload } from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import Controls from '../Form/Controls';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { getFormData } from '../Form/utils';
import { useObjectStore } from '../IndexedDB/hooks';
import Link from '../Link/Link';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Modal from '../Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import { sanitizeLoadedProfiles } from '../Profiles/utils';
import QRCode from '../QRCode/QRCode';
import { add as addToast } from '../Toast/Toast';

import styles from './Share.module.css';

const Share = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isModalOpen, setIsModalOpen] = useState();
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [loadingDownloadUrl, setLoadingDownloadUrl] = useState();
  const ref = useRef();
  const { items, isLoading, save } = useObjectStore();
  const { items: profiles, save: saveProfile } = useObjectStore('profiles');
  const { items: settings, isLoadingSettings, save: saveSettings } = useObjectStore('settings');
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

  return isLoading || isLoadingSettings ? null : (
    <>
      <PageTitle>Share</PageTitle>
      <p>
        To Share your data with another device, follow these steps
        <List>
          <ListItem>Click on the Share button</ListItem>
          <ListItem>Wait for the QR code to appear</ListItem>
          <ListItem>
            Open the <Link href="https://chealt.com/share">Chealt Share page</Link> on the device
            you want to share your data with
          </ListItem>
          <ListItem>Click the Scan QR button</ListItem>
        </List>
      </p>
      <p>After generating a QR code you will have an hour to scan it.</p>
      <p>
        <b>PRIVACY WARNING</b>: When using the share functionality, your data temporarily (for an
        hour) will be stored on our servers.
      </p>
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
          Encrypt data
        </Input>
        <Button disabled={!encryptData} onClick={() => setIsPasswordModalOpen(true)}>
          Set password
        </Button>
        <Modal isOpen={isPasswordModalOpen} close={() => setIsPasswordModalOpen(false)}>
          <Form name="password" onSubmit={savePassword}>
            <Input type="password" name="password" autocomplete="password" value={password}>
              Password
            </Input>
            <Button type="submit" emphasized>
              Save password
            </Button>
          </Form>
        </Modal>
        <Button
          emphasized
          onClick={uploadContent}
          disabled={loadingDownloadUrl || (encryptData && !password)}
        >
          Share
        </Button>
        <Button onClick={() => setIsModalOpen(true)}>Scan QR Code</Button>
      </Controls>
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
