import { add as addToast } from '../Toast';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';

const CreateProfileForm = ({ save }) => {
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

  return (
    <Form name="createProfile" onSubmit={createProfile}>
      <h2>Add new profile</h2>
      <Input name="name" required="required" showRequired={false}>
        Name
      </Input>
      <Button emphasized type="submit">
        Add Profile
      </Button>
    </Form>
  );
};

export default CreateProfileForm;
