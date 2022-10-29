import { useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Option from '../Form/Option';
import Select from '../Form/Select';
import { useObjectStore } from '../IndexedDB/hooks';
import PageTitle from '../PageTitle/PageTitle';
import { findDetails } from './utils';

const bloodTypes = ['A', 'AB', 'B', 'O'];

const CheckUps = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { save, items } = useObjectStore('bloodType');
  const profileBloodDetails = findDetails(items, selectedProfileId.value);

  const saveBloodType = async (event) => {
    event.preventDefault();

    const {
      bloodType: { value: bloodType }
    } = event.target;
    const key = profileBloodDetails.key || crypto.randomUUID();

    await save({ key, value: { bloodType, profileId: selectedProfileId.value } });
  };

  return (
    <>
      <PageTitle>Check-ups & Medical Tests</PageTitle>
      <Form name="bloodType" onSubmit={saveBloodType}>
        <Select name="bloodType" label="Blood type">
          {bloodTypes.map((type) => (
            <Option
              key={type}
              value={type}
              selected={profileBloodDetails.value?.bloodType === type}
            >
              {type}
            </Option>
          ))}
        </Select>
        <Button type="submit" emphasized>
          Save
        </Button>
      </Form>
    </>
  );
};

export default CheckUps;
