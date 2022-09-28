import { useState } from 'preact/hooks';

import Form from '../Form/Form';
import Input from '../Form/Input';
import Option from '../Form/Option';
import Select from '../Form/Select';
import PageTitle from '../PageTitle';
import { transformPersonalDetails, getImperialUnitWeight, getImperialUnitHeight } from './utils';
import Button from '../Form/Button';
import { add as addToast } from '../Toast';
import { useObjectStore } from '../IndexedDB/hooks';

import styles from './index.module.css';

const PersonalDetails = () => {
  const { items, save } = useObjectStore('personalDetails');
  const [input, setInput] = useState({});
  const saved = transformPersonalDetails(items);
  const personalDetails = {
    firstName: input.firstName || saved.firstName,
    lastName: input.lastName || saved.lastName,
    dateOfBirth: input.dateOfBirth || saved.dateOfBirth,
    email: input.email || saved.email,
    sex: input.sex || saved.sex,
    height: input.height || saved.height,
    weight: input.weight || saved.weight
  };

  const saveInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const saveFormData = async (event) => {
    event.preventDefault();

    try {
      for (const key of Object.keys(personalDetails)) {
        await save({ key, value: { value: personalDetails[key] } });
      }

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

  return (
    <>
      <PageTitle>Personal Details</PageTitle>
      <Form name="personalDetails" onSubmit={saveFormData}>
        <Input type="text" name="firstName" value={personalDetails.firstName} onInput={saveInput}>
          First Name
        </Input>
        <Input type="text" name="lastName" value={personalDetails.lastName} onInput={saveInput}>
          Last Name
        </Input>
        <Input
          type="date"
          name="dateOfBirth"
          value={personalDetails.dateOfBirth}
          onInput={saveInput}
        >
          Date of Birth
        </Input>
        <Input type="email" name="email" value={personalDetails.email} onInput={saveInput}>
          Email
        </Input>
        <Select name="sex" label="Sex" value={personalDetails.sex} onInput={saveInput}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <div class={styles.multiUnit}>
          <Input type="number" name="height" value={personalDetails.height} onInput={saveInput}>
            Height
          </Input>
          <div class={styles.imperialUnit}>{imperialUnitHeight}</div>
        </div>
        <div class={styles.multiUnit}>
          <Input type="number" name="weight" value={personalDetails.weight} onInput={saveInput}>
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
