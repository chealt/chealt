import { useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { getConditions, getLocalVaccinations } from './utils';
import { AppState } from '../App/state';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { add as addToast } from '../Toast/Toast';

import styles from './NewItem.module.css';

const NewItem = ({ save, onDone }) => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [conditions, setConditions] = useState();
  const locale = navigator.language || 'en-US';
  const localVaccinations = getLocalVaccinations(locale);

  const saveFormData = async (event) => {
    event.preventDefault();

    const { name, brandName, dateOfAdmin, batchNo, site, immuniser, venue } = event.target;
    const vaccination = {
      batchNo: batchNo.value,
      brandName: brandName.value,
      conditions: conditions.split(','),
      dateOfAdmin: dateOfAdmin.value,
      immuniser: immuniser.value,
      name: name.value,
      site: site.value,
      venue: venue.value,
      profileId: selectedProfileId.value
    };

    try {
      await save({ key: crypto.randomUUID(), value: vaccination });

      // clear inputs
      name.value = null;
      brandName.value = null;
      dateOfAdmin.value = null;
      batchNo.value = null;
      site.value = null;
      immuniser.value = null;
      venue.value = null;
      setConditions(null);

      addToast({ message: 'Saved vaccination details' });

      onDone();
    } catch {
      addToast({ message: 'Could not save vaccination details', role: 'alert' });
    }
  };

  return (
    <Form name="newVaccination" onSubmit={saveFormData} classNames={styles.newVaccination}>
      <Input
        type="text"
        name="name"
        required="required"
        list="name"
        onChange={(event) => {
          const vaccinationName = event.target.value;
          setConditions(getConditions({ vaccinationName, locale }));
        }}
      >
        {t('pages.vaccinations.name')}
        {localVaccinations && (
          <datalist id="name">
            {localVaccinations.map(({ name }) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        )}
      </Input>
      <Input type="text" name="brandName">
        {t('pages.vaccinations.brandName')}
      </Input>
      <Input type="date" name="dateOfAdmin" required="required">
        {t('pages.vaccinations.dateOfAdmin')}
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
      <Input type="text" name="batchNo">
        {t('pages.vaccinations.batchNo')}
      </Input>
      <Input type="text" name="site">
        {t('pages.vaccinations.site')}
      </Input>
      <Input type="text" name="immuniser">
        {t('pages.vaccinations.immuniser')}
      </Input>
      <Input type="text" name="venue">
        {t('pages.vaccinations.venue')}
      </Input>
      <Button emphasized type="submit">
        {t('common.save')}
      </Button>
    </Form>
  );
};

export default NewItem;
