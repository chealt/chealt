import { localFormatDate } from '@chealt/browser-utils';
import { useCallback, useState } from 'preact/hooks';

import EmptyState from '../EmptyState/EmptyState';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';
import { toggleItem } from '../Helpers/array';
import Vaccine from '../Icons/Vaccine';
import { useObjectStore } from '../IndexedDB/hooks';
import Modal from '../Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import Cell from '../Table/Cell';
import HeadCell from '../Table/HeadCell';
import Row from '../Table/Row';
import Table from '../Table/Table';
import { add as addToast } from '../Toast/Toast';
import Controls from './Controls';
import NewItem from './NewItem';

import styles from './Vaccinations.module.css';

const Vaccinations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const deleteEnabled = Boolean(selectedItems.length);
  const { deleteItems, save, items } = useObjectStore('vaccinations');
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
                <HeadCell>Conditions</HeadCell>
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
                  <Cell>
                    <Tag value={vaccination.value.conditions.join(',')} />
                  </Cell>
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
        <NewItem save={save} onDone={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Vaccinations;
