import { useCallback, useEffect, useState } from 'preact/hooks';
import database from '../IndexedDB';
import Button from '../Form/Button';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Modal from '../Modal';
import PageTitle from '../PageTitle';
import { add as addToast } from '../Toast';
import Table from '../Table';
import Row from '../Table/Row';
import Cell from '../Table/Cell';
import HeadCell from '../Table/HeadCell';
import { save } from './utils';

import styles from './index.module.css';
import Controls from './Controls';
import { toggleItem } from '../Helpers/array';

const Vaccinations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaccinations, setVaccinations] = useState([]);
  const [instance, setInstance] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const loadVaccinations = useCallback(async () => {
    const vaccinations = await instance.list({ type: 'vaccinations' });

    setVaccinations(vaccinations);
  }, [instance]);

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
      await save({ instance, key: crypto.randomUUID(), value: vaccination });

      // clear inputs
      name.value = null;
      brandName.value = null;
      dateOfAdmin.value = null;
      batchNo.value = null;
      site.value = null;
      immuniser.value = null;
      venue.value = null;

      setIsModalOpen(false);

      addToast({ message: 'Saved vaccination details' });

      loadVaccinations();
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
      loadVaccinations();
    }
  }, [instance, loadVaccinations]);

  return (
    <>
      <PageTitle>Vaccinations</PageTitle>
      <Controls
        instance={instance}
        selectedItems={selectedItems}
        onDelete={() => {
          setSelectedItems([]);
          loadVaccinations();
        }}
      />
      {Boolean(vaccinations.length) && (
        <div class={styles.vaccinations}>
          <Table>
            <Row>
              <HeadCell />
              <HeadCell>Name</HeadCell>
              <HeadCell>Brand name</HeadCell>
              <HeadCell>Date (of admin)</HeadCell>
              <HeadCell>Batch No.</HeadCell>
              <HeadCell>Route / Site</HeadCell>
              <HeadCell>Immuniser</HeadCell>
              <HeadCell>Venue</HeadCell>
            </Row>
            {vaccinations.map((vaccination) => (
              <Row key={vaccination.key}>
                <Cell>
                  <Input
                    type="checkbox"
                    value={vaccination.key}
                    onClick={() => {
                      setSelectedItems(toggleItem(vaccination.key, selectedItems));
                    }}
                  />
                </Cell>
                <Cell>{vaccination.value.name}</Cell>
                <Cell>{vaccination.value.brandName}</Cell>
                <Cell>{vaccination.value.dateOfAdmin}</Cell>
                <Cell>{vaccination.value.batchNo}</Cell>
                <Cell>{vaccination.value.site}</Cell>
                <Cell>{vaccination.value.immuniser}</Cell>
                <Cell>{vaccination.value.venue}</Cell>
              </Row>
            ))}
          </Table>
        </div>
      )}
      <Button emphasized onClick={() => setIsModalOpen(true)}>
        Add +
      </Button>
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
      </Modal>
    </>
  );
};

export default Vaccinations;