import classNames from 'classnames';
import { useState } from 'preact/hooks';

import ProfileForm from './ProfileForm';
import { setSelectedProfileId } from './signals';
import ProfilePicture from '../Avatar/Component';
import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import Container from '../Layout/Container';
import List from '../List/List';
import ListItem from '../List/ListItem';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import PageTitle from '../PageTitle/PageTitle';

import styles from './Profiles.module.css';

const Profiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState({});
  const {
    items: profiles,
    isLoading,
    save,
    refresh,
    deleteItems: deleteProfile
  } = useObjectStore('profiles');

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

  return (
    <>
      <PageTitle>Profiles</PageTitle>
      <Container>
        <p>
          You can add multiple profiles to your device here. This way you can manage multiple users'
          data on a single device.
        </p>
        {(!isLoading && (
          <List>
            {profiles.map(({ key, value: { name, isSelected, profilePicture } }) => (
              <ListItem
                key={key}
                className={classNames({
                  [styles.profileItem]: true,
                  [styles.selected]: isSelected
                })}
              >
                <ProfilePicture blob={profilePicture?.blob} name={name} />
                <span class={styles.name}>{name}</span>
                <div class={styles.controls}>
                  <Button onClick={() => editProfile(key)}>Edit</Button>
                  <Button disabled={isSelected} onClick={() => selectProfile(key)}>
                    Select
                  </Button>
                  <Button disabled={isSelected} ghost onClick={() => confirmAndDelete(key)}>
                    X
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        )) || <LoadingIndicator />}
        <Button emphasized onClick={() => setIsModalOpen(true)}>
          Add +
        </Button>
        <ProfileForm
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          refresh={refresh}
          save={save}
          {...profileToEdit}
        />
      </Container>
    </>
  );
};

export default Profiles;
