import { useState } from 'preact/hooks';

import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import Container from '../Layout/Container';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Modal from '../Modal';
import PageTitle from '../PageTitle';
import ProfileForm from './ProfileForm';
import { setSelectedProfileId } from './signals';

import styles from './Profiles.module.css';

const Profiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState({});
  const { items: profiles, save, deleteItems: deleteProfile } = useObjectStore('profiles');

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

    setSelectedProfileId(key);
  };

  const editProfile = (key) => {
    const profile = profiles.find((profile) => key === profile.key);

    setProfileToEdit(profile.value);
    setIsModalOpen(true);
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setProfileToEdit({});
  };

  return (
    <>
      <PageTitle>Profiles</PageTitle>
      <Container>
        <p>
          You can add multiple profiles to your device here. This way you can manage multiple users'
          data on a single device.
        </p>
        <List>
          {profiles.map(({ key, value: { name, isSelected } }) => (
            <ListItem key={key} className={styles.profileItem}>
              <span class={styles.name}>{name}</span>
              <Button onClick={() => editProfile(key)}>Edit</Button>
              <Button disabled={isSelected} onClick={() => selectProfile(key)}>
                Select
              </Button>
              <Button disabled={isSelected} ghost onClick={() => confirmAndDelete(key)}>
                X
              </Button>
            </ListItem>
          ))}
        </List>
        <Button emphasized onClick={() => setIsModalOpen(true)}>
          Add +
        </Button>
        <Modal isOpen={isModalOpen} close={closeAndResetModal}>
          <ProfileForm save={save} onDone={closeAndResetModal} {...profileToEdit} />
        </Modal>
      </Container>
    </>
  );
};

export default Profiles;
