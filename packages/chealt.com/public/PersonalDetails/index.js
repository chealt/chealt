import Form from '../Form/Form';
import Input from '../Form/Input';
import Option from '../Form/Option';
import Select from '../Form/Select';
import PageTitle from '../PageTitle';

const PersonalDetails = () => (
  <>
    <PageTitle>Personal Details</PageTitle>
    <Form name="personalDetails">
      <Input type="text" name="firstName">
        First Name
      </Input>
      <Input type="text" name="lastName">
        Last Name
      </Input>
      <Input type="date" name="dateOfBirth">
        Date of Birth
      </Input>
      <Input type="email" name="email">
        Email
      </Input>
      <Select name="sex" label="Sex">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form>
  </>
);

export default PersonalDetails;
