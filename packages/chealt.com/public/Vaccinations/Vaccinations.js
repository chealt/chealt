import { localFormatDate } from '@chealt/browser-utils';
import { useCallback, useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import Controls from './Controls';
import NewItem from './NewItem';
import { findItems } from './utils';
import { AppState } from '../App/state';
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

import styles from './Vaccinations.module.css';

const Vaccinations = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const deleteEnabled = Boolean(selectedItems.length);
  const { deleteItems, save, isLoading, items } = useObjectStore('vaccinations');
  const profileItems = findItems(items, selectedProfileId.value);
  const hasVaccinations = Boolean(profileItems.length);

  const deleteSelectedItems = useCallback(async () => {
    try {
      await deleteItems(selectedItems);

      addToast({ message: 'Vaccination(s) deleted' });

      setSelectedItems([]);
    } catch {
      addToast({ message: 'Failed to delete vaccination(s)', role: 'alert' });
    }
  }, [deleteItems, selectedItems]);

  return isLoading ? null : (
    <>
      <PageTitle>{t('pages.vaccinations.title')}</PageTitle>
      {(hasVaccinations && (
        <>
          <Controls onDelete={deleteEnabled && deleteSelectedItems} />
          <div class={styles.vaccinations}>
            <Table>
              <Row>
                <HeadCell />
                <HeadCell>{t('pages.vaccinations.name')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.brandName')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.dateOfAdmin')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.conditions')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.batchNo')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.site')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.immuniser')}</HeadCell>
                <HeadCell>{t('pages.vaccinations.venue')}</HeadCell>
              </Row>
              {profileItems.map((vaccination) => (
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
            {t('common.add')}
          </Button>
        </>
      )) || (
        <EmptyState>
          <Vaccine />
          <p>{t('pages.vaccinations.emptyVaccinations')}</p>
          <Button emphasized onClick={() => setIsModalOpen(true)}>
            {t('common.startAdding')}
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
