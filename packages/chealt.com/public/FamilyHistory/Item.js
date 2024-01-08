import { useContext, useState, useEffect } from 'preact/hooks';
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
  const [conditions, setConditions] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();

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

  useEffect(() => {
    if (rest?.value?.conditions) {
      setConditions(rest.value.conditions.join(','));
    }
  }, [rest?.value?.conditions]);

  useEffect(() => {
    if (rest?.value?.firstName) {
      setFirstName(rest?.value?.firstName);
    }
  }, [rest?.value?.firstName]);

  useEffect(() => {
    if (rest?.value?.lastName) {
      setLastName(rest?.value?.lastName);
    }
  }, [rest?.value?.lastName]);

  useEffect(() => {
    if (rest?.value?.dateOfBirth) {
      setDateOfBirth(rest?.value?.dateOfBirth);
    }
  }, [rest?.value?.dateOfBirth]);

  return (
    <Form name="newFamilyHistory" onSubmit={saveFormData} centered>
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
      <Button emphasized type="submit">
        {t('common.save')}
      </Button>
    </Form>
  );
};

export default Item;
