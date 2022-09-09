import PageTitle from '../PageTitle';
import Button from '../Form/Button';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Controls from '../Form/Controls';
import Link from '../Link';

const Share = () => (
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
      <Button emphasized>Share</Button>
      <Button>Scan QR Code</Button>
    </Controls>
  </>
);

export default Share;
