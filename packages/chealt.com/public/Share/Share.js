import { useEffect, useState, useRef } from 'preact/hooks';
import QrScanner from 'qr-scanner';

import { download, upload } from './utils';
import Button from '../Form/Button';
import Controls from '../Form/Controls';
import { useObjectStore } from '../IndexedDB/hooks';
import Link from '../Link/Link';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Modal from '../Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import QRCode from '../QRCode/QRCode';
import { add as addToast } from '../Toast/Toast';

import styles from './Share.module.css';

const Share = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [loadingDownloadUrl, setLoadingDownloadUrl] = useState();
  const ref = useRef();
  const { items, isLoading, save } = useObjectStore();

  const uploadContent = async () => {
    setLoadingDownloadUrl(true);

    try {
      const downloadUrl = await upload(items);

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
            const data = await download(url);

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
  }, [isModalOpen, save]);

  return isLoading ? null : (
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
        <Button emphasized onClick={uploadContent} disabled={loadingDownloadUrl}>
          Share
        </Button>
        <Button onClick={() => setIsModalOpen(true)}>Scan QR Code</Button>
      </Controls>
      <Modal isOpen={isQRCodeModalOpen} close={() => setIsQRCodeModalOpen(false)}>
        {downloadUrl && <QRCode data={downloadUrl} />}
      </Modal>
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <video class={styles.video} ref={ref} />
      </Modal>
    </>
  );
};

export default Share;
