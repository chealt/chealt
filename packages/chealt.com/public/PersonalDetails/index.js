import { useEffect, useState } from 'preact/hooks';
import database from '../IndexedDB';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Option from '../Form/Option';
import Select from '../Form/Select';
import PageTitle from '../PageTitle';
import {
  transformPersonalDetails,
  getImperialUnitWeight,
  getImperialUnitHeight,
  savePersonalDetails
} from './utils';
import Button from '../Form/Button';

import styles from './index.module.css';
import { add as addToast } from '../Toast';

const PersonalDetails = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [instance, setInstance] = useState();
  const [newHeight, setNewHeight] = useState();
  const [newWeight, setNewWeight] = useState();

  const saveFormData = async (event) => {
    event.preventDefault();

    const { firstName, lastName, dateOfBirth, email, sex, height, weight } = event.target;
    const personalDetails = [
      { key: 'firstName', value: firstName.value },
      { key: 'lastName', value: lastName.value },
      { key: 'dateOfBirth', value: dateOfBirth.value },
      { key: 'email', value: email.value },
      { key: 'sex', value: sex.value },
      { key: 'height', value: height.value },
      { key: 'weight', value: weight.value }
    ];

    try {
      await savePersonalDetails({ instance, personalDetails });

      setPersonalDetails(personalDetails);

      addToast({ message: 'Saved personal details' });
    } catch {
      addToast({ message: 'Could not save personal details', role: 'alert' });
    }
  };

  useEffect(() => {
    if (!instance) {
      (async () => {
        setInstance(await database({ database: 'chealt' }));
      })();
    }
  }, [instance]);

  useEffect(() => {
    if (instance) {
      (async () => {
        const personalDetails = await instance.list({ type: 'personalDetails' });

        setPersonalDetails(transformPersonalDetails(personalDetails));
      })();
    }
  }, [instance]);

  const height = newHeight !== undefined ? newHeight : personalDetails.height;
  const weight = newWeight !== undefined ? newWeight : personalDetails.weight;
  const imperialUnitHeight = height ? getImperialUnitHeight(height) : '- " - \'';
  const imperialUnitWeight = weight ? `${getImperialUnitWeight(weight)} lb` : '- lb';

  return (
    <>
      <PageTitle>Personal Details</PageTitle>
      <Form name="personalDetails" onSubmit={saveFormData}>
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
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <div class={styles.multiUnit}>
          <Input
            type="number"
            name="height"
            value={height}
            onInput={(event) => {
              setNewHeight(event.target.value);
            }}
          >
            Height
          </Input>
          <div class={styles.imperialUnit}>{imperialUnitHeight}</div>
        </div>
        <div class={styles.multiUnit}>
          <Input
            type="number"
            name="weight"
            value={weight}
            onInput={(event) => {
              setNewWeight(event.target.value);
            }}
          >
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
