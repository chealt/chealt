import { useCallback, useRef, useState } from 'preact/hooks';

import Modal from '../Modal';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { useObjectStore } from '../IndexedDB/hooks';
import Container from '../Layout/Container';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle';
import CreateProfileForm from './CreateProfileForm';

import styles from './Profiles.module.css';

const Profiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileToRenameKey, setProfileToRenameKey] = useState();
  const { items: profiles, save, deleteItems: deleteProfile } = useObjectStore('profiles');
  const formRef = useRef();

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

  const renameProfile = async (event) => {
    event.preventDefault();

    const { name } = event.target;

    const profile = profiles.find((profile) => profile.key === profileToRenameKey);

    await save({ key: profile.key, value: { ...profile.value, name: name.value } });

    setProfileToRenameKey(undefined);
  };

  const showRenameInput = useCallback(
    (key) => {
      setProfileToRenameKey(key);
      setTimeout(() => {
        const formElement = formRef.current.base;
        const nameInputElement = formElement.elements.name;

        // focus the name input
        nameInputElement.focus();
      }, 10);
    },
    [formRef]
  );

  const triggerRename = useCallback(() => {
    const formElement = formRef.current.base;

    formElement.submit();
  }, [formRef]);

  return (
    <>
      <PageTitle>Profiles</PageTitle>
      <Container>
        <p>
          You can add multiple profiles to your device here. This way you can manage multiple users'
          data on a single device.
        </p>
        {Boolean(profiles) && (
          <Form name="renameProfile" onSubmit={renameProfile} ref={formRef}>
            <List>
              {profiles.map(({ key, value: { name, isSelected } }) => (
                <ListItem key={key} className={styles.profileItem}>
                  {profileToRenameKey === key ? (
                    <Input
                      name="name"
                      required="required"
                      showRequired={false}
                      value={name}
                      hideLabel
                    >
                      Name
                    </Input>
                  ) : (
                    <span class={styles.name}>{name}</span>
                  )}
                  <Button
                    onClick={() => {
                      if (profileToRenameKey !== key) {
                        showRenameInput(key);
                      } else {
                        triggerRename();
                      }
                    }}
                  >
                    {profileToRenameKey !== key ? 'Rename' : 'Save'}
                  </Button>
                  <Button disabled={isSelected} onClick={() => selectProfile(key)}>
                    Select
                  </Button>
                  <Button disabled={isSelected} ghost onClick={() => confirmAndDelete(key)}>
                    X
                  </Button>
                </ListItem>
              ))}
            </List>
          </Form>
        )}
        <Button emphasized onClick={() => setIsModalOpen(true)}>
          Add +
        </Button>
        <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
          <CreateProfileForm save={save} onDone={() => setIsModalOpen(false)} />
        </Modal>
      </Container>
    </>
  );
};

export default Profiles;
