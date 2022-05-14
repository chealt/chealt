import { useEffect, useState } from 'preact/hooks';
import { init as initDB, save as saveToDB, list as listObjectStore } from '../IndexedDB';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Option from '../Form/Option';
import Select from '../Form/Select';
import PageTitle from '../PageTitle';
import { transformPersonalDetails } from './utils';

const PersonalDetails = () => {
  const [personalDetails, setPersonalDetails] = useState({});

  const saveFormData = async (event) => {
    event.preventDefault();
    const { firstName, lastName, dateOfBirth, email, sex, height, weight } = event.target;

    await Promise.all([
      saveToDB({ type: 'personalDetails', key: 'firstName', value: firstName.value }),
      saveToDB({ type: 'personalDetails', key: 'lastName', value: lastName.value }),
      saveToDB({ type: 'personalDetails', key: 'dateOfBirth', value: dateOfBirth.value }),
      saveToDB({ type: 'personalDetails', key: 'email', value: email.value }),
      saveToDB({ type: 'personalDetails', key: 'sex', value: sex.value }),
      saveToDB({ type: 'personalDetails', key: 'height', value: height.value }),
      saveToDB({ type: 'personalDetails', key: 'weight', value: weight.value })
    ]);

    setPersonalDetails({
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      email: email.value,
      sex: sex.value
    });
  };

  useEffect(() => {
    (async () => {
      await initDB({ database: 'chealt' });
      const personalDetails = await listObjectStore({ type: 'personalDetails' });

      setPersonalDetails(transformPersonalDetails(personalDetails));
    })();
  }, []);

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
        <Input type="number" name="height" value={personalDetails.height}>
          Height
        </Input>
        <Input type="number" name="weight" value={personalDetails.weight}>
          Weight
        </Input>
        <button type="submit">Save</button>
      </Form>
    </>
  );
};

export default PersonalDetails;
