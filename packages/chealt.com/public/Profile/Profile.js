import { add as addToast } from '../Toast';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { useObjectStore } from '../IndexedDB/hooks';
import Container from '../Layout/Container';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle';

import styles from './Profile.module.css';
import { useState } from 'preact/hooks';

const Profile = () => {
  const [profileToRenameKey, setProfileToRenameKey] = useState();
  const { items: profiles, save, deleteItems: deleteProfile } = useObjectStore('profiles');

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

  const confirmAndDelete = (key) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you would like to delete this profile?')) {
      deleteProfile([key]);
    }
  };

  const selectProfile = async (key) => {
    for (const profile of profiles) {
      await save({
        key: profile.key,
        value: { ...profile.value, isSelected: profile.key === key }
      });
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
            {profiles.map(({ key, value: { name, isSelected } }) => (
              <ListItem key={key} className={styles.profileItem}>
                {profileToRenameKey === key ? (
                  <>
                    <Input name={name} required="required" value={name}>
                      Name
                    </Input>
                  </>
                ) : (
                  <span class={styles.name}>{name}</span>
                )}
                <Button onClick={() => setProfileToRenameKey(key)}>rename</Button>
                <Button disabled={isSelected} onClick={() => selectProfile(key)}>
                  select
                </Button>
                <Button disabled={isSelected} ghost onClick={() => confirmAndDelete(key)}>
                  X
                </Button>
              </ListItem>
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
