import { useEffect, useState, useRef } from 'preact/hooks';
import database from '../IndexedDB';
import PageTitle from '../PageTitle';
import Button from '../Form/Button';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Controls from '../Form/Controls';
import Link from '../Link';
import { upload } from './utils';
import QRCode from '../QRCode';
import QrScanner from 'qr-scanner';

const Share = () => {
  const [instance, setInstance] = useState();
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

  const scanQRCode = () => {
    const videoElement = ref.current;
    const qrScanner = new QrScanner(videoElement, (result) => console.log('decoded qr code:', result), {});

    qrScanner.start();
  };

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
        <Button onClick={scanQRCode}>Scan QR Code</Button>
      </Controls>
      {downloadUrl && <QRCode data={downloadUrl} />}
      <video ref={ref} />
    </>
  );
};

export default Share;
