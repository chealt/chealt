import { add as addToast } from '../Toast';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { useObjectStore } from '../IndexedDB/hooks';
import Container from '../Layout/Container';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle';

const Profile = () => {
  const { items: profiles, save } = useObjectStore('profiles');

  const createProfile = async (event) => {
    event.preventDefault();

    const { name } = event.target;
    const id = crypto.randomUUID();
    const profile = {
      name: name.value,
      id
    };

    try {
      await save({ key: id, value: profile });

      // clear inputs
      name.value = null;

      addToast({ message: 'Created profile' });
    } catch {
      addToast({ message: 'Could not create profile', role: 'alert' });
    }
  };

  return (
    <>
      <PageTitle>Profile</PageTitle>
      <Container>
        <p>
          You can add multiple profiles to your device here. This way you can manage multiple users'
          data on a single device.
        </p>
        {Boolean(profiles) && (
          <List>
            {profiles.map(({ key, value: { name } }) => (
              <ListItem key={key}>{name}</ListItem>
            ))}
          </List>
        )}
        <Form name="createProfile" onSubmit={createProfile}>
          <Input name="name" required="required" showRequired={false}>
            Name
          </Input>
          <Button emphasized type="submit">
            Add Profile
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
