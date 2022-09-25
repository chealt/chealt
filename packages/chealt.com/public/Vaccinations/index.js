import { useEffect, useState } from 'preact/hooks';
import database from '../IndexedDB';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Modal from '../Modal';
import PageTitle from '../PageTitle';
import { add as addToast } from '../Toast';

const Vaccinations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaccinations, setVaccinations] = useState([]);
  const [instance, setInstance] = useState();

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
      await instance.save({ type: 'vaccinations', key: crypto.randomUUID(), value: vaccination });

      setIsModalOpen(false);

      addToast({ message: 'Saved vaccination details' });
    } catch {
      addToast({ message: 'Could not save vaccination details', role: 'alert' });
    }
  };

  useEffect(() => {
    if (!instance) {
      (async () => {
        setInstance(await database({ database: 'chealt' }));
      })();
    } else {
      (async () => {
        const vaccinations = await instance.list({ type: 'vaccinations' });

        setVaccinations(vaccinations);
      })();
    }
  }, [instance]);

  return (
    <>
      <PageTitle>Vaccinations</PageTitle>
      {Boolean(vaccinations.length) && (
        <ul>
          {vaccinations.map((vaccination) => (
            <li key={vaccination.key}>{vaccination.value.name}</li>
          ))}
        </ul>
      )}
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Form name="newVaccination" onSubmit={saveFormData}>
          <Input type="text" name="name" required="required">
            Name
          </Input>
          <Input type="text" name="brandName" required="required">
            Brand Name
          </Input>
          <Input type="date" name="dateOfAdmin" required="required">
            Date of admin
          </Input>
          <Input type="text" name="batchNo" required="required">
            Batch No.
          </Input>
          <Input type="text" name="site" required="required">
            Site / Route
          </Input>
          <Input type="text" name="immuniser" required="required">
            Immuniser
          </Input>
          <Input type="text" name="venue" required="required">
            Venue
          </Input>
          <Button emphasized>Save</Button>
        </Form>
      </Modal>
      <Button emphasized onClick={() => setIsModalOpen(true)}>
        Add +
      </Button>
    </>
  );
};

export default Vaccinations;
