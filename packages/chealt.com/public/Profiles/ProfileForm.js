import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { add as addToast } from '../Toast';

const ProfileForm = ({ save, onDone, id, name, isSelected }) => {
  const saveProfile = async (event) => {
    event.preventDefault();

    const profile = {
      name: event.target.name.value,
      id: id || crypto.randomUUID(),
      isSelected: Boolean(isSelected)
    };

    try {
      await save({ key: profile.id, value: profile });

      // clear inputs
      event.target.name.value = null;

      addToast({ message: 'Profile saved' });

      onDone();
    } catch {
      addToast({ message: 'Could not save profile', role: 'alert' });
    }
  };

  return (
    <Form name="profileDetails" onSubmit={saveProfile}>
      <Input name="name" value={name || ''} required="required" showRequired={false}>
        Name
      </Input>
      <Button emphasized type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ProfileForm;
