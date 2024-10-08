import classNames from 'classnames';
import { useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import ProfileForm from './ProfileForm';
import { setSelectedProfileId } from './signals';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import Container from '../Layout/Container';
import List from '../List/List';
import ListItem from '../List/ListItem';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import PageTitle from '../PageTitle/PageTitle';
import ProfilePicture from '../ProfilePicture/ProfilePicture';

import styles from './Profiles.module.css';

const Profiles = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
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
    if (window.confirm(t('pages.profiles.confirmDelete'))) {
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
    const profile = profiles.find((p) => key === p.key);

    setProfileToEdit(profile.value);
    setIsModalOpen(true);
  };

  const addProfile = () => {
    setProfileToEdit({});
    setIsModalOpen(true);
  };

  return (
    <>
      <PageTitle>{t('pages.profiles.title')}</PageTitle>
      <Container>
        <p>{t('pages.profiles.instructions')}</p>
        {(!isLoading && (
          <List>
            {profiles.map(({ key, value: { name, profilePicture } }) => (
              <ListItem
                key={key}
                className={classNames({
                  [styles.profileItem]: true,
                  [styles.selected]: selectedProfileId.value === key
                })}
              >
                <ProfilePicture blob={profilePicture?.blob} name={name} />
                <span class={styles.name}>{name}</span>
                <div class={styles.controls}>
                  <Button onClick={() => editProfile(key)}>{t('common.edit')}</Button>
                  <Button
                    disabled={selectedProfileId.value === key}
                    onClick={() => selectProfile(key)}
                  >
                    {t('common.select')}
                  </Button>
                  <Button
                    disabled={selectedProfileId.value === key}
                    ghost
                    onClick={() => confirmAndDelete(key)}
                  >
                    X
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        )) || <LoadingIndicator />}
        <Button emphasized onClick={addProfile}>
          {t('common.add')}
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
