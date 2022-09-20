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
import { add as addToast } from '../Toast';

import styles from './index.module.css';
import { savePersonalDetails } from '../PersonalDetails/utils';

const Share = () => {
  const [instance, setInstance] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [loadingDownloadUrl, setLoadingDownloadUrl] = useState();
  const ref = useRef();

  const uploadContent = async () => {
    setLoadingDownloadUrl(true);

    try {
      const personalDetails = await instance.list({ type: 'personalDetails' });
      const documents = await instance.list({ type: 'documents' });

      const downloadUrl = await upload({ personalDetails, documents });

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

    if (!qrScanner) {
      qrScanner = new QrScanner(
        videoElement,
        async ({ data: url }) => {
          qrScanner.stop();

          try {
            const { personalDetails, documents } = await download(url);

            if (personalDetails) {
              await savePersonalDetails({
                instance,
                personalDetails: personalDetails.map((detail) => ({
                  key: detail.key,
                  value: detail.value.value // remove saved timestamp so it is recreated
                }))
              });
            }

            if (documents) {
              await Promise.all(
                documents.map(({ key, value }) =>
                  instance.save({
                    type: 'documents',
                    key,
                    value
                  })
                )
              );
            }

            addToast({ message: 'Download successful' });
          } catch (error) {
            addToast({ message: 'Download failed', role: 'alert' });
          }

          setIsModalOpen(false);
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
  }, [isModalOpen, instance]);

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
