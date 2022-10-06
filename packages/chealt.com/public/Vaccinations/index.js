import { useCallback, useState } from 'preact/hooks';
import { localFormatDate } from '@chealt/browser-utils';

import EmptyState from '../EmptyState';
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
import Controls from './Controls';
import { toggleItem } from '../Helpers/array';
import { useObjectStore } from '../IndexedDB/hooks';
import Vaccine from '../Icons/Vaccine';

import styles from './index.module.css';

const Vaccinations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const deleteEnabled = Boolean(selectedItems.length);
  const { deleteItems, items, save } = useObjectStore('vaccinations');
  const hasVaccinations = Boolean(items.length);

  const deleteSelectedItems = useCallback(async () => {
    try {
      await deleteItems(selectedItems);

      addToast({ message: 'Vaccination(s) deleted' });

      setSelectedItems([]);
    } catch {
      addToast({ message: 'Failed to delete vaccination(s)', role: 'alert' });
    }
  }, [deleteItems, selectedItems]);

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

      setIsModalOpen(false);

      addToast({ message: 'Saved vaccination details' });
    } catch {
      addToast({ message: 'Could not save vaccination details', role: 'alert' });
    }
  };

  return (
    <>
      <PageTitle>Vaccinations</PageTitle>
      {(hasVaccinations && (
        <>
          <Controls onDelete={deleteEnabled && deleteSelectedItems} />
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
              {items.map((vaccination) => (
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
                  <Cell>{localFormatDate(vaccination.value.dateOfAdmin)}</Cell>
                  <Cell>{vaccination.value.batchNo}</Cell>
                  <Cell>{vaccination.value.site}</Cell>
                  <Cell>{vaccination.value.immuniser}</Cell>
                  <Cell>{vaccination.value.venue}</Cell>
                </Row>
              ))}
            </Table>
          </div>
          <Button emphasized onClick={() => setIsModalOpen(true)}>
            Add +
          </Button>
        </>
      )) || (
        <EmptyState>
          <Vaccine />
          <p>Your vaccinations will be shown here.</p>
          <Button emphasized onClick={() => setIsModalOpen(true)}>
            Start adding
          </Button>
        </EmptyState>
      )}
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Form name="newVaccination" onSubmit={saveFormData} classNames={styles.newVaccination}>
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
