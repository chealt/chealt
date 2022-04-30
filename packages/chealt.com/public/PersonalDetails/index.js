import Form from '../Form/Form';
import Input from '../Form/Input';
import PageTitle from '../PageTitle';

const PersonalDetails = () => (
  <>
    <PageTitle>Personal Details</PageTitle>
    <Form>
      <Input type="date" name="dateOfBirth">
        Date of Birth
      </Input>
      <Input type="email" name="email">
        Email
      </Input>
    </Form>
  </>
);

export default PersonalDetails;
