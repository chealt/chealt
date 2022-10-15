import { useState } from 'preact/hooks';

import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import { add as addToast } from '../Toast';

import styles from './NewItem.module.css';
import { getConditions, getLocalVaccinations } from './utils';

const NewItem = ({ save, onDone }) => {
  const [conditions, setConditions] = useState();
  const locale = navigator.language || 'en-US';
  const localVaccinations = getLocalVaccinations(locale);
  const saveFormData = async (event) => {
    event.preventDefault();

    const { name, brandName, dateOfAdmin, batchNo, site, immuniser, venue } = event.target;
    const vaccination = {
      name: name.value,
      brandName: brandName.value,
      dateOfAdmin: dateOfAdmin.value,
      batchNo: batchNo.value,
      site: site.value,
      immuniser: immuniser.value,
      venue: venue.value
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
        Name
        {localVaccinations && (
          <datalist id="name">
            {localVaccinations.map(({ name }) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        )}
      </Input>
      <Input type="text" name="brandName" required="required">
        Brand Name
      </Input>
      <Input type="date" name="dateOfAdmin" required="required">
        Date of admin
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
        Conditions
      </Input>
      <Input type="text" name="batchNo">
        Batch No.
      </Input>
      <Input type="text" name="site">
        Site / Route
      </Input>
      <Input type="text" name="immuniser">
        Immuniser
      </Input>
      <Input type="text" name="venue">
        Venue
      </Input>
      <Button emphasized>Save</Button>
    </Form>
  );
};

export default NewItem;
