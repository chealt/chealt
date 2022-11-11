import { useContext, useState } from 'preact/hooks';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Option from '../Form/Option';
import Select from '../Form/Select';
import { getFormData } from '../Form/utils';
import { useObjectStore } from '../IndexedDB/hooks';
import PageTitle from '../PageTitle/PageTitle';
import { add as addToast } from '../Toast/Toast';
import { findPersonalDetails, getImperialUnitWeight, getImperialUnitHeight } from './utils';

import styles from './PersonalDetails.module.css';

const PersonalDetails = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items, isLoading, save } = useObjectStore('personalDetails');
  const [input, setInput] = useState({});
  const saved = findPersonalDetails(items, selectedProfileId);
  const personalDetails = {
    ...saved,
    ...input
  };

  const saveInput = ({ target: { form } }) => {
    setInput(getFormData(form));
  };

  const saveFormData = async (event) => {
    event.preventDefault();

    try {
      await save({
        key: selectedProfileId.value,
        value: personalDetails
      });

      addToast({ message: 'Saved personal details' });
    } catch {
      addToast({ message: 'Could not save personal details', role: 'alert' });
    }
  };

  const imperialUnitHeight = personalDetails.height
    ? getImperialUnitHeight(personalDetails.height)
    : `- " - '`;
  const imperialUnitWeight = personalDetails.weight
    ? `${getImperialUnitWeight(personalDetails.weight)} lb`
    : '- lb';

  return isLoading ? null : (
    <>
      <PageTitle>Personal Details</PageTitle>
      <Form name="personalDetails" onSubmit={saveFormData} onInput={saveInput}>
        <Input type="text" name="firstName" value={personalDetails.firstName}>
          First Name
        </Input>
        <Input type="text" name="lastName" value={personalDetails.lastName}>
          Last Name
        </Input>
        <Input type="date" name="dateOfBirth" value={personalDetails.dateOfBirth}>
          Date of Birth
        </Input>
        <Input type="email" name="email" value={personalDetails.email}>
          Email
        </Input>
        <Select name="sex" label="Sex" value={personalDetails.sex}>
          <Option value="" />
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <div class={styles.multiUnit}>
          <Input type="number" name="height" value={personalDetails.height}>
            Height
          </Input>
          <div class={styles.imperialUnit}>{imperialUnitHeight}</div>
        </div>
        <div class={styles.multiUnit}>
          <Input type="number" name="weight" value={personalDetails.weight}>
            Weight
          </Input>
          <div class={styles.imperialUnit}>{imperialUnitWeight}</div>
        </div>
        <Button emphasized type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

export default PersonalDetails;
