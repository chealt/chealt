import { useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import ProfilePicture from './ProfilePicture';
import { AppState } from '../App/state';
import Dialog from '../Dialog/Dialog';
import Button from '../Form/Button';
import { useObjectStore } from '../IndexedDB/hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { findPersonalDetails } from '../PersonalDetails/utils';
import { setSelectedProfileId } from '../Profiles/signals';

import styles from './ProfilePictureMenu.module.css';

const ProfilePictureMenu = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    items: profiles,
    save,
    refresh: refreshProfiles,
    isLoading: isLoadingProfiles
  } = useObjectStore('profiles');
  const selectedProfile = profiles.find(
    (profile) => profile.value.id === selectedProfileId.value
  )?.value;
  const { items: personalDetails, isLoading: isLoadingPersonalDetails } =
    useObjectStore('personalDetails');
  const selectedPersonalDetails = findPersonalDetails(personalDetails, selectedProfileId);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const changeProfile = (profileId) => async () => {
    const profiles = await refreshProfiles();

    for (const profile of profiles) {
      await save({
        key: profile.key,
        value: { ...profile.value, isSelected: profile.key === profileId }
      });
    }

    setSelectedProfileId(profileId);
    setIsMenuOpen(false);
  };

  const isLoading = isLoadingPersonalDetails || isLoadingProfiles;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.container}>
      <Button label={t('pages.home.changeProfile')} onClick={toggleMenu} contentOnly rounded>
        <ProfilePicture
          highlighted
          blob={selectedProfile.profilePicture?.blob}
          name={selectedPersonalDetails?.firstName || selectedProfile.name}
        />
      </Button>
      <Dialog
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        dialogClassName={styles.menu}
        transparentBackdrop
      >
        {({ isOpen }) =>
          isOpen &&
          profiles.length > 1 && (
            <ul>
              {profiles
                .filter((profile) => profile.key !== selectedProfileId.value)
                .map(({ key, value: { name, profilePicture } }) => (
                  <li key={key}>
                    <Button onClick={changeProfile(key)} className={styles.item}>
                      <span>{name}</span>
                      <ProfilePicture
                        blob={profilePicture?.blob}
                        name={findPersonalDetails(personalDetails, key)?.firstName || name}
                      />
                    </Button>
                  </li>
                ))}
            </ul>
          )
        }
      </Dialog>
    </div>
  );
};

export default ProfilePictureMenu;
