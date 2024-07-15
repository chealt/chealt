import { useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { findDetails } from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Option from '../Form/Option';
import Select from '../Form/Select';
import { useObjectStore } from '../IndexedDB/hooks';

const bloodTypes = ['A', 'AB', 'B', 'O'];

const BloodType = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { save, isLoading, items } = useObjectStore('bloodType');
  const profileBloodDetails = findDetails(items, selectedProfileId.value);

  const saveBloodType = async (event) => {
    event.preventDefault();

    const {
      bloodType: { value: bloodType }
    } = event.target;
    const key = profileBloodDetails.key || crypto.randomUUID();

    await save({ key, value: { bloodType, profileId: selectedProfileId.value } });
  };

  return isLoading ? null : (
    <Form name="bloodType" onSubmit={saveBloodType}>
      <Select name="bloodType" label={t('common.bloodType')}>
        {bloodTypes.map((type) => (
          <Option key={type} value={type} selected={profileBloodDetails.value?.bloodType === type}>
            {type}
          </Option>
        ))}
      </Select>
      <Button type="submit" emphasized>
        {t('common.save')}
      </Button>
    </Form>
  );
};

export default BloodType;
