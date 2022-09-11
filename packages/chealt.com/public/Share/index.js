import { useEffect, useState } from 'preact/hooks';
import database from '../IndexedDB';
import PageTitle from '../PageTitle';
import Button from '../Form/Button';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Controls from '../Form/Controls';
import Link from '../Link';
import { getUploadUrl } from './utils';

const Share = () => {
  const [instance, setInstance] = useState();

  const uploadContent = async () => {
    const url = await getUploadUrl();
    const personalDetails = await instance.list({ type: 'personalDetails' });

    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ personalDetails })
    });
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
        <Button emphasized onClick={uploadContent}>
          Share
        </Button>
        <Button>Scan QR Code</Button>
      </Controls>
    </>
  );
};

export default Share;
