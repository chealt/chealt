import { useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { add as addToast } from '../Toast/Toast';

const Item = ({ save, onDone, ...rest }) => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [conditions, setConditions] = useState(rest?.value?.conditions?.join(',') || '');
  const [firstName, setFirstName] = useState(rest?.value?.firstName);
  const [lastName, setLastName] = useState(rest?.value?.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(rest?.value?.dateOfBirth);

  const saveFormData = async (event) => {
    event.preventDefault();

    const { firstNameInput, lastNameInput, dateOfBirthInput } = event.target;
    const familyHistory = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      dateOfBirth: dateOfBirthInput.value,
      conditions: conditions ? conditions.split(',') : [],
      profileId: selectedProfileId.value
    };

    try {
      await save({ key: rest?.id || crypto.randomUUID(), value: familyHistory });

      // clear inputs
      setFirstName(null);
      setLastName(null);
      setDateOfBirth(null);
      setConditions(null);

      addToast({ message: t('pages.familyHistory.saveSuccess') });

      onDone();
    } catch {
      addToast({ message: t('pages.familyHistory.saveFailure'), role: 'alert' });
    }
  };

  return (
    <Form
      name={rest?.id ? 'editFamilyHistory' : 'newFamilyHistory'}
      onSubmit={saveFormData}
      centered
    >
      <fieldset>
        <legend>
          {rest?.id ? t('pages.familyHistory.editTitle') : t('pages.familyHistory.newTitle')}
        </legend>
        <Input
          type="text"
          name="firstName"
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        >
          {t('common.firstName')}
        </Input>
        <Input
          type="text"
          name="lastName"
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        >
          {t('common.lastName')}
        </Input>
        <Input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={({ target: { value } }) => setDateOfBirth(value)}
        >
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
      </fieldset>
      <Button emphasized type="submit">
        {t('common.save')}
      </Button>
    </Form>
  );
};

export default Item;
