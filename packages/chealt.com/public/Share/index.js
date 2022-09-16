import { useEffect, useState, useRef } from 'preact/hooks';
import database from '../IndexedDB';
import PageTitle from '../PageTitle';
import Button from '../Form/Button';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Controls from '../Form/Controls';
import Link from '../Link';
import { download, upload } from './utils';
import QRCode from '../QRCode';
import QrScanner from 'qr-scanner';
import Modal from '../Modal';

import styles from './index.module.css';

const Share = () => {
  const [instance, setInstance] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [loadingDownloadUrl, setLoadingDownloadUrl] = useState();
  const ref = useRef();

  const uploadContent = async () => {
    setLoadingDownloadUrl(true);

    try {
      const personalDetails = await instance.list({ type: 'personalDetails' });

      const downloadUrl = await upload({ personalDetails });

      setDownloadUrl(downloadUrl);
      setLoadingDownloadUrl(false);
    } catch {
      setLoadingDownloadUrl(false);
    }
  };

  useEffect(() => {
    const videoElement = ref.current;
    let qrScanner;

    if (!qrScanner) {
      qrScanner = new QrScanner(
        videoElement,
        ({ data: url }) => {
          download(url);

          qrScanner.stop();
        },
        {}
      );
    }

    if (isModalOpen) {
      qrScanner.start();
    } else {
      qrScanner.stop();
    }

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!instance) {
      (async () => {
        setInstance(await database({ database: 'chealt' }));
      })();
    }
  }, [instance]);

  return (
    <>
      <PageTitle>Share</PageTitle>
      <p>
        To Share your data with another device, follow these steps
        <List>
          <ListItem>Click on the Share button</ListItem>
          <ListItem>Wait for the QR code to appear</ListItem>
          <ListItem>
            Open the <Link href="https://chealt.com/share">Chealt Share page</Link> on the device you want to share your
            data with
          </ListItem>
          <ListItem>Click the Scan QR button</ListItem>
        </List>
      </p>
      <Controls>
        <Button emphasized onClick={uploadContent} disabled={downloadUrl || loadingDownloadUrl}>
          Share
        </Button>
        <Button onClick={() => setIsModalOpen(true)}>Scan QR Code</Button>
      </Controls>
      {downloadUrl && <QRCode data={downloadUrl} />}
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <video class={styles.video} ref={ref} />
      </Modal>
    </>
  );
};

export default Share;
