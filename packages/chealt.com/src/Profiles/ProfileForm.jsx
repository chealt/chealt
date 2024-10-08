import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { getFilesFromEvent } from '../Documents/utils';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import LanguageSelector from '../Intl/LanguageSelector';
import Modal from '../Modal/Modal';
import { add as addToast } from '../Toast/Toast';

const ProfileForm = ({
  save,
  setIsOpen,
  refresh,
  id,
  language,
  name,
  isSelected,
  profilePicture,
  isOpen
}) => {
  const { t } = useTranslation();
  const [selectedName, setSelectedName] = useState(name);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedName(name);
  }, [name]);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const close = () => {
    setSelectedProfilePicture();
    setSelectedLanguage();
    setSelectedName();
    setIsOpen(false);
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    const profile = {
      name: event.target.name.value,
      id: id || crypto.randomUUID(),
      profilePicture: selectedProfilePicture || profilePicture,
      language: event.target.language.value,
      isSelected: Boolean(isSelected)
    };

    try {
      await save({ key: profile.id, value: profile });

      refresh();

      event.target.profilePicture.value = null; // clear the profile picture input after saving

      addToast({ message: 'Profile saved' });

      close();
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
    <Modal isOpen={isOpen} close={close}>
      <Form name="profileDetails" onSubmit={saveProfile}>
        <Input
          name="name"
          value={selectedName || ''}
          required="required"
          showRequired={false}
          onChange={({ target: { value } }) => setSelectedName(value)}
        >
          {t('common.name')}
        </Input>
        <Input
          name="profilePicture"
          type="file"
          accept="image/*"
          onChange={setProfilePicture}
          ondrop={setProfilePicture}
        >
          {t('common.profilePicture')}
        </Input>
        <LanguageSelector
          onChange={setSelectedLanguage}
          language={selectedLanguage || language}
          profileId={id}
        />
        <Button emphasized type="submit">
          {t('common.save')}
        </Button>
      </Form>
    </Modal>
  );
};

export default ProfileForm;
