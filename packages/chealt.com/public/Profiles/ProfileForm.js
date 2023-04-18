import { useState } from 'preact/hooks';

import { getFilesFromEvent } from '../Documents/utils';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { add as addToast } from '../Toast/Toast';

const ProfileForm = ({ save, onDone, id, name, isSelected }) => {
  const [selectedProfilePicture, setSelectedProfilePicture] = useState();
  const saveProfile = async (event) => {
    event.preventDefault();

    const profile = {
      name: event.target.name.value,
      id: id || crypto.randomUUID(),
      profilePicture: selectedProfilePicture,
      isSelected: Boolean(isSelected)
    };

    try {
      await save({ key: profile.id, value: profile });

      // clear inputs
      event.target.name.value = null;

      addToast({ message: 'Profile saved' });

      event.target.profilePicture.value = null; // clear the profile picture input after saving

      onDone();
    } catch {
      addToast({ message: 'Could not save profile', role: 'alert' });
    }
  };

  const setProfilePicture = async (event) => {
    event.preventDefault();

    const files = await getFilesFromEvent(event);

    if (files.length > 0) {
      setSelectedProfilePicture(files[0]);
    }
  };

  return (
    <Form name="profileDetails" onSubmit={saveProfile}>
      <Input name="name" value={name || ''} required="required" showRequired={false}>
        Name
      </Input>
      <Input
        name="profilePicture"
        type="file"
        accept="image/*"
        onChange={setProfilePicture}
        ondrop={setProfilePicture}
      >
        Profile picture
      </Input>
      <Button emphasized type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ProfileForm;
