import { useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { add as addToast } from '../Toast/Toast';

const NewItem = ({ save, onDone }) => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [conditions, setConditions] = useState();

  const saveFormData = async (event) => {
    event.preventDefault();

    const { firstName, lastName, dateOfBirth } = event.target;
    const familyHistory = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      conditions: conditions.split(','),
      profileId: selectedProfileId.value
    };

    try {
      await save({ key: crypto.randomUUID(), value: familyHistory });

      // clear inputs
      firstName.value = null;
      lastName.value = null;
      dateOfBirth.value = null;
      setConditions(null);

      addToast({ message: t('pages.familyHistory.saveSuccess') });

      onDone();
    } catch {
      addToast({ message: t('pages.familyHistory.saveFailure'), role: 'alert' });
    }
  };

  return (
    <Form name="newFamilyHistory" onSubmit={saveFormData} centered>
      <Input type="text" name="firstName">
        {t('common.firstName')}
      </Input>
      <Input type="text" name="lastName">
        {t('common.lastName')}
      </Input>
      <Input type="date" name="dateOfBirth">
        {t('common.dateOfBirth')}
      </Input>
      <Input
        type="tag"
        name="conditions"
        value={conditions}
        deleteItem={(value) => {
          setConditions(
            conditions
              .split(',')
              .filter((condition) => condition !== value)
              .join(',')
          );
        }}
        addItem={(value) => {
          setConditions(conditions ? `${conditions},${value}` : value);
        }}
      >
        {t('common.medicalConditions')}
      </Input>
      <Button emphasized type="submit">
        {t('common.save')}
      </Button>
    </Form>
  );
};

export default NewItem;
