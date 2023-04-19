import { useContext } from 'preact/hooks';

import ProfilePicture from './ProfilePicture';
import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { findPersonalDetails } from '../PersonalDetails/utils';

const ProfilePictureMenu = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items: profiles, isLoading: isLoadingProfiles } = useObjectStore('profiles');
  const selectedProfile = profiles.find(
    (profile) => profile.value.id === selectedProfileId.value
  )?.value;
  const { items: personalDetails, isLoading: isLoadingPersonalDetails } =
    useObjectStore('personalDetails');
  const selectedPersonalDetails = findPersonalDetails(personalDetails, selectedProfileId);

  const isLoading = isLoadingPersonalDetails || isLoadingProfiles;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ProfilePicture
      blob={selectedProfile.profilePicture?.blob}
      name={selectedPersonalDetails?.firstName || selectedProfile.name}
    />
  );
};

export default ProfilePictureMenu;
